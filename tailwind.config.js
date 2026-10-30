/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          50: '#f6f9fe',
          100: '#eaf1fc',
          200: '#d5e4fa',
          300: '#a3c7f5',
          400: '#6ea6ee',
          500: '#2563eb', // electric blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0b192c', // deep navy
          950: '#070f1e', // obsidian navy
        },
        electric: {
          light: '#38bdf8',
          DEFAULT: '#0066ff',
          deep: '#0052cc',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f7f3eb',
          200: '#eee5d6',
          300: '#e2d3bc',
          400: '#d1b99a',
          500: '#ba9e7d',
        },
        gold: {
          light: '#fde047',
          DEFAULT: '#d4af37',
          dark: '#b48a1b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft-3d': '0 20px 40px -15px rgba(11, 25, 44, 0.12), 0 0 0 1px rgba(11, 25, 44, 0.05)',
        'glow-blue': '0 0 35px -5px rgba(0, 102, 255, 0.35)',
        'glow-gold': '0 0 25px -5px rgba(212, 175, 55, 0.4)',
        'card-3d': '0 30px 60px -12px rgba(11, 25, 44, 0.18), 0 18px 36px -18px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
