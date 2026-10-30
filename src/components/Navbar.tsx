import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Settings } from 'lucide-react';
import type { VeloraConfig } from '../data/config';

interface NavbarProps {
  config: VeloraConfig;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Destinos', href: '#destinos' },
    { label: '50 Rutas', href: '#rutas' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Cotizador', href: '#cotizador' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Galería', href: '#galeria' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
      'Hola, VELORA. Quisiera consultar sobre las rutas y experiencias en Piura.'
    )}`;
    window.open(url, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-soft-3d py-3 border-b border-sand-200/60'
          : 'bg-sand-50/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-velora-500 rounded-lg p-1"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md border-2 border-gold transition-transform group-hover:scale-105">
              <img
                src="/velora-logo.svg"
                alt="VELORA Rutas y Experiencias"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-display font-black text-xl sm:text-2xl text-velora-900 tracking-wider">
                VELORA
              </span>
              <span className="block text-[10px] sm:text-[11px] font-semibold text-velora-600 tracking-widest uppercase">
                Rutas y Experiencias • Piura
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold uppercase tracking-wider text-velora-900/80 hover:text-velora-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-velora-500 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin / Config Cog */}
            <button
              onClick={onOpenAdmin}
              title="Panel de Configuración de Datos (Precios, WhatsApp, Promociones)"
              className="p-2 rounded-full text-velora-700 hover:text-velora-900 hover:bg-sand-200 transition-colors"
              aria-label="Abrir panel de configuración"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Direct WhatsApp Callout Button */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu & Config Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmin}
              title="Configuración"
              className="p-2 rounded-lg text-velora-800 hover:bg-sand-200"
              aria-label="Configuración"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-velora-900 hover:bg-sand-200 focus:outline-none focus:ring-2 focus:ring-velora-500"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-sand-50/98 border-b border-sand-300 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-5 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-velora-900 hover:bg-sand-200 hover:text-velora-600 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-sand-200 space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Escríbenos por WhatsApp</span>
              </button>

              <div className="text-center text-xs text-velora-700">
                Atención directa: <span className="font-semibold">{config.whatsappDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
