import React, { useState } from 'react';
import type { VeloraConfig } from '../data/config';
import {
  MessageCircle,
  ShieldCheck,
  FileText,
  MapPin,
  Clock,
  ArrowUp,
  X,
  AlertCircle,
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
  config: VeloraConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const [legalModal, setLegalModal] = useState<'terminos' | 'privacidad' | 'cancelaciones' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-velora-950 text-sand-200 pt-16 pb-12 border-t border-velora-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-gold p-0.5 overflow-hidden bg-sand-100">
                <img
                  src="/velora-logo.svg"
                  alt="VELORA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white tracking-wider block">
                  {config.brandName}
                </span>
                <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">
                  {config.tagline} • PIURA
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sand-300 leading-relaxed max-w-sm">
              "{config.slogan}" — Experiencias auténticas, seguras y personalizadas en las playas, dunas, valles y tradiciones culturales del norte del Perú.
            </p>

            <div className="pt-2 text-xs text-sand-300/80 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>{config.location}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{config.operatingHours}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Navegación Rápida */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#destinos" className="hover:text-white transition-colors">
                  Destinos Destacados
                </a>
              </li>
              <li>
                <a href="#rutas" className="hover:text-white transition-colors">
                  50 Rutas Turísticas
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-white transition-colors">
                  Ofertas & Promociones
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Calculadora de Paquetes
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Categorías Populares */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-sand-300">
              <li>Playas de Piura (14 rutas)</li>
              <li>Naturaleza & Aventura (10 rutas)</li>
              <li>Cultura e Historia (10 rutas)</li>
              <li>Gastronomía Norteña (8 rutas)</li>
              <li>Experiencias Privadas (8 rutas)</li>
              <li>Máncora, Vichayito & Los Órganos</li>
              <li>Manglares de Vice & Sechura</li>
            </ul>
          </div>

          {/* Col 5: Redes & Canales */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Contacto Directo
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {config.whatsappDisplay}</span>
              </a>

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-600/90 hover:bg-pink-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram: {config.instagramHandle}</span>
              </a>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-sand-300/80 leading-relaxed">
                Consultas y cotizaciones atendidas directamente por asesores de viaje.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <div>
            <p>
              © {new Date().getFullYear()} <strong>{config.brandName}</strong> — {config.tagline}. Piura, Perú. Todos los derechos reservados.
            </p>
            <p className="text-[10px] text-sand-400 mt-1">
              Plataforma web demostrativa. Precios, itinerarios y promociones sujetos a validación de disponibilidad con el equipo.
            </p>
          </div>

          {/* Legal Links Trigger */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setLegalModal('terminos')}
              className="hover:text-white transition-colors underline"
            >
              Términos y Condiciones
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('privacidad')}
              className="hover:text-white transition-colors underline"
            >
              Política de Privacidad
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('cancelaciones')}
              className="hover:text-white transition-colors underline"
            >
              Reservas y Cancelaciones
            </button>

            <button
              onClick={scrollToTop}
              title="Volver arriba"
              className="ml-2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative bg-white text-velora-950 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl border border-sand-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              aria-label="Cerrar modal legal"
              className="absolute top-5 right-5 text-velora-500 hover:text-velora-900"
            >
              <X className="w-6 h-6" />
            </button>

            {legalModal === 'terminos' && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-black text-velora-950 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-velora-600" />
                  Términos y Condiciones del Servicio
                </h3>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  1. <strong>Identidad y Naturaleza:</strong> VELORA — Rutas y Experiencias es una iniciativa turística enfocada en la promoción y operación de rutas y recorridos por la región Piura.
                </p>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  2. <strong>Carácter de las Solicitudes:</strong> Toda solicitud formulada a través de esta página web (calculadora, formularios o botones de WhatsApp) constituye una cotización inicial referencial y no una reserva firme hasta que el asesor de VELORA valide cupos, confirme tarifa final y se registre el anticipo acordado.
                </p>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  3. <strong>Tarifas:</strong> Los precios expresados en soles (S/.) son demostrativos y referenciales. Pueden fluctuar de acuerdo con la temporada alta (Semana Santa, Fiestas Patrias, Año Nuevo), tamaño del grupo y tipo de unidad de transporte requerida.
                </p>
              </div>
            )}

            {legalModal === 'privacidad' && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-black text-velora-950 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-velora-600" />
                  Política de Privacidad y Protección de Datos
                </h3>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  En VELORA respetamos rigurosamente la privacidad de nuestros clientes conforme a la Ley N° 29733 (Ley de Protección de Datos Personales del Perú).
                </p>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  Los datos solicitados (nombre, celular de contacto, fecha de viaje y preferencias) son utilizados exclusivamente para coordinar tu servicio turístico y enviarte la propuesta formal. No compartimos ni comercializamos tu información con terceros no vinculados al servicio contratado.
                </p>
              </div>
            )}

            {legalModal === 'cancelaciones' && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-black text-velora-950 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-velora-600" />
                  Condiciones de Reserva y Cancelación
                </h3>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  • <strong>Anticipo de confirmación:</strong> Se requiere un abono del 50% para bloquear la movilidad y fecha acordada. El saldo se cancela antes del inicio del tour.
                </p>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  • <strong>Reprogramaciones:</strong> Notificadas con al menos 72 horas de anticipación, permiten trasladar la fecha sin penalidad conforme a disponibilidad.
                </p>
                <p className="text-xs sm:text-sm text-velora-800 leading-relaxed">
                  • <strong>Factores de fuerza mayor:</strong> En caso de contingencias de capitanía de puerto, marejadas o bloqueos viales imprevistos, se acordará itinerario alternativo o reprogramación consensuada.
                </p>
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-sand-200 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-velora-900 text-white font-bold text-xs"
              >
                Entendido y cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
