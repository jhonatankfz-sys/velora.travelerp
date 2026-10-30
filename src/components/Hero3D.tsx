import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Compass, Sparkles, Tag, ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import type { VeloraConfig } from '../data/config';
import type { TourCategory } from '../types';

interface Hero3DProps {
  config: VeloraConfig;
  onSelectCategory: (category: TourCategory | 'all') => void;
  onOpenBooking: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  config,
  onSelectCategory,
  onOpenBooking,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D undulating wave grid / particle terrain (representing ocean ripples and coastal sand dunes)
    const countX = 45;
    const countY = 30;
    const numParticles = countX * countY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    const colorBlue = new THREE.Color('#0066FF');
    const colorLightBlue = new THREE.Color('#38BDF8');
    const colorGold = new THREE.Color('#D4AF37');

    let i = 0, j = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        positions[i] = (ix - countX / 2) * 2.2; // x
        positions[i + 1] = (iy - countY / 2) * 2.0; // y
        positions[i + 2] = 0; // z

        scales[j] = 1.0;

        // Gradient coloring: mostly electric ocean blue with gold accents
        const mixedColor = Math.random() > 0.85 ? colorGold : (Math.random() > 0.4 ? colorLightBlue : colorBlue);
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(56,189,248,0.8)');
      grad.addColorStop(1, 'rgba(0,102,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = -Math.PI / 3.2; // angled like waves meeting shore
    particles.position.y = -8;
    scene.add(particles);

    // Mouse tilt tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 10;
      targetY = y * 6;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        clock += 0.02;
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Wave motion algorithm
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;

        let index = 0;
        for (let ix = 0; ix < countX; ix++) {
          for (let iy = 0; iy < countY; iy++) {
            // Sinusoidal wave combination simulating Pacific swell
            array[index + 2] =
              Math.sin(ix * 0.35 + clock) * 2.5 +
              Math.cos(iy * 0.35 + clock * 0.7) * 2.0;
            index += 3;
          }
        }
        posAttr.needsUpdate = true;

        particles.rotation.z = mouseX * 0.02;
        particles.rotation.x = -Math.PI / 3.2 + mouseY * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoriesList = [
    { key: 'playas' as TourCategory, label: 'Playas', icon: '🌊', count: '14 rutas' },
    { key: 'naturaleza' as TourCategory, label: 'Naturaleza & Aventura', icon: '🌵', count: '10 rutas' },
    { key: 'cultura' as TourCategory, label: 'Cultura & Historia', icon: '🏛️', count: '10 rutas' },
    { key: 'gastronomia' as TourCategory, label: 'Gastronomía', icon: '🐟', count: '8 rutas' },
    { key: 'especiales' as TourCategory, label: 'Experiencias Privadas', icon: '✨', count: '8 rutas' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-100">
      {/* Background Photography Blend */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Costa norte de Piura"
          className="w-full h-full object-cover object-center filter saturate-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-transparent to-sand-100/90" />
      </div>

      {/* 3D Wave Particles Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-80"
      />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Brand Circular Emblem */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 shadow-soft-3d border border-sand-300 backdrop-blur-md mb-6 transform hover:scale-105 transition-transform duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-gold p-0.5 overflow-hidden">
            <img src="/velora-logo.svg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-velora-900">
            {config.brandName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-electric" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-velora-600 uppercase">
            {config.tagline}
          </span>
          <span className="hidden sm:inline-flex items-center text-xs text-velora-700 bg-sand-200 px-2.5 py-0.5 rounded-full">
            <MapPin className="w-3 h-3 mr-1 text-velora-500" />
            {config.location}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-velora-950 tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          Descubre el norte del Perú{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-velora-600 via-electric to-velora-800">
            como nunca antes
            <svg
              className="absolute -bottom-2 left-0 w-full text-gold h-3"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9C50 3 150 3 197 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-velora-900/80 font-normal max-w-3xl mx-auto mb-10 leading-relaxed">
          {config.heroSubtitle}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-14">
          {/* Button 1: Explorar destinos */}
          <button
            onClick={() => scrollToSection('destinos')}
            className="group px-7 py-4 rounded-xl bg-velora-600 hover:bg-velora-700 text-white font-bold text-base shadow-glow-blue hover:shadow-card-3d transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>Explorar destinos</span>
          </button>

          {/* Button 2: Ver promociones */}
          <button
            onClick={() => scrollToSection('promociones')}
            className="group px-7 py-4 rounded-xl bg-white hover:bg-sand-100 text-velora-900 font-bold text-base shadow-soft-3d border border-sand-300 hover:border-gold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <Tag className="w-5 h-5 text-gold-dark group-hover:scale-110 transition-transform" />
            <span>Ver promociones</span>
          </button>

          {/* Button 3: Reservar mi aventura */}
          <button
            onClick={() => {
              onOpenBooking();
              scrollToSection('cotizador');
            }}
            className="group px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            <span>Reservar mi aventura</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Exploration Chips */}
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase font-bold tracking-widest text-velora-600 mb-4">
            Explora nuestras 50 rutas por categoría:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categoriesList.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  onSelectCategory(cat.key);
                  scrollToSection('rutas');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-velora-900 font-semibold text-xs sm:text-sm border border-sand-200 hover:border-velora-400 hover:shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-[10px] font-bold bg-sand-200 text-velora-700 px-1.5 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notice of authenticity & demo clarity */}
        <div className="mt-8 text-[11px] text-velora-700/80 max-w-xl mx-auto">
          🛡️ VELORA — Rutas y Experiencias en Piura. Tarifas referenciales sujetas a confirmación directa con el equipo.
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="relative z-20 flex justify-center mt-6">
        <button
          onClick={() => scrollToSection('destinos')}
          className="text-velora-500 hover:text-velora-700 animate-bounce transition-colors p-2"
          aria-label="Ir a Destinos"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
