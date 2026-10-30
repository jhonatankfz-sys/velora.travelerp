import fs from 'fs';
import path from 'path';

const REPO_OWNER = 'jhonatankfz-sys';
const REPO_NAME = 'velora.travelerp';
const BRANCH = 'main';

const token = process.env.GITHUB_TOKEN || process.argv[2];

if (!token) {
  console.error('Error: Debes proporcionar un token de GitHub como argumento o en la variable GITHUB_TOKEN.');
  process.exit(1);
}

const baseDir = path.resolve('.');

// Collect all files from src/ and public/
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const targetFiles = [
  ...getFiles(path.join(baseDir, 'public')),
  ...getFiles(path.join(baseDir, 'src'))
];

console.log(`Encontrados ${targetFiles.length} archivos para sincronizar (public/ y src/).`);

async function githubRequest(endpoint, method = 'GET', data = null) {
  const headers = {
    'User-Agent': 'Velora-Deployer',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  const options = {
    method,
    headers
  };

  if (data) {
    options.body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${endpoint}`, options);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub API Error (${res.status}): ${errText}`);
  }
  return res.json();
}

async function run() {
  try {
    // 1. Get latest commit SHA on main
    console.log('1. Obteniendo último commit en main...');
    const refData = await githubRequest(`/git/ref/heads/${BRANCH}`);
    const latestCommitSha = refData.object.sha;
    console.log(`   Último commit SHA: ${latestCommitSha}`);

    // 2. Get base tree
    const commitData = await githubRequest(`/git/commits/${latestCommitSha}`);
    const baseTreeSha = commitData.tree.sha;

    // 3. Create blobs for each file
    console.log('2. Creando blobs en GitHub...');
    const treeItems = [];

    for (const filePath of targetFiles) {
      const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      const isBinary = filePath.endsWith('.png') || filePath.endsWith('.ico');
      
      let blobData;
      if (isBinary) {
        const content = fs.readFileSync(filePath).toString('base64');
        blobData = await githubRequest('/git/blobs', 'POST', {
          content,
          encoding: 'base64'
        });
      } else {
        const content = fs.readFileSync(filePath, 'utf-8');
        blobData = await githubRequest('/git/blobs', 'POST', {
          content,
          encoding: 'utf-8'
        });
      }

      treeItems.push({
        path: relPath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      });
      process.stdout.write(`   ✓ ${relPath}\n`);
    }

    // 4. Create new tree based on latest tree (adds without deleting anything)
    console.log('3. Creando nuevo árbol de git...');
    const newTree = await githubRequest('/git/trees', 'POST', {
      base_tree: baseTreeSha,
      tree: treeItems
    });
    console.log(`   Árbol creado SHA: ${newTree.sha}`);

    // 5. Create commit
    console.log('4. Creando commit...');
    const commitMessage = 'feat: agregar carpetas src/ y public/ completas para despliegue en Vercel';
    const newCommit = await githubRequest('/git/commits', 'POST', {
      message: commitMessage,
      tree: newTree.sha,
      parents: [latestCommitSha]
    });
    console.log(`   Commit creado SHA: ${newCommit.sha}`);

    // 6. Update branch reference
    console.log('5. Actualizando rama main...');
    await githubRequest(`/git/refs/heads/${BRANCH}`, 'PATCH', {
      sha: newCommit.sha,
      force: false
    });

    console.log('\n=============================================');
    console.log('¡SINCRONIZACIÓN EXITOSA!');
    console.log(`Commit URL: https://github.com/${REPO_OWNER}/${REPO_NAME}/commit/${newCommit.sha}`);
    console.log('=============================================');
  } catch (err) {
    console.error('Error durante la sincronización:', err.message);
    process.exit(1);
  }
}

run();
