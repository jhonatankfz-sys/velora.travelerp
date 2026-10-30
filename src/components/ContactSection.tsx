import React, { useState } from 'react';
import type { VeloraConfig } from '../data/config';
import {
  MessageCircle,
  MapPin,
  Clock,
  Send,
  User,
  Phone,
  CheckCircle,
  Compass,
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface ContactSectionProps {
  config: VeloraConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('Información general sobre rutas');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim()) return;

    // Send formatted WhatsApp message
    const formattedText = `Hola, VELORA. Mi nombre es *${name}*.\n` +
      `• Contacto: ${contactInfo}\n` +
      `• Interés: ${selectedInterest}\n` +
      `• Mensaje: ${message || 'Deseo información sobre sus tours en Piura.'}`;

    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank');

    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setContactInfo('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <section id="contacto" className="py-20 bg-sand-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-velora-600" />
            Canales de Atención
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Conversemos sobre tu próxima aventura
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Estamos en Piura, Perú. Respondemos tus consultas de forma personalizada por WhatsApp e Instagram.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Info & Channels (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-soft-3d border border-sand-200 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-velora-600 tracking-wider">
                Datos de la Empresa
              </span>
              <h3 className="font-display text-2xl font-black text-velora-950 mt-1">
                {config.brandName}
              </h3>
              <p className="text-xs font-semibold text-velora-700">
                {config.tagline} • Turismo en Piura
              </p>
            </div>

            {/* Operating Zone */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-sand-50 border border-sand-200">
              <MapPin className="w-5 h-5 text-velora-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-velora-950">
                  Zona Principal de Operación
                </span>
                <span className="text-xs text-velora-700">
                  {config.location} (Rutas en Piura, Máncora, Los Órganos, Colán, Sechura y Catacaos).
                </span>
                <span className="block text-[10px] text-velora-500 mt-1 italic">
                  * Coordinaciones de recojo en puntos céntricos u hoteles de la ciudad.
                </span>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="block text-xs font-bold text-emerald-950">
                  Atención Directa por WhatsApp
                </span>
                <span className="text-xs text-emerald-800 font-semibold block mb-2">
                  {config.whatsappDisplay}
                </span>
                <a
                  href={`https://wa.me/${config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chatear ahora</span>
                </a>
              </div>
            </div>

            {/* Instagram Profile */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
              <InstagramIcon className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="block text-xs font-bold text-pink-950">
                  Síguenos en Instagram
                </span>
                <span className="text-xs text-pink-800 font-semibold block mb-2">
                  {config.instagramHandle}
                </span>
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Ver perfil de Instagram</span>
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-sand-50 border border-sand-200">
              <Clock className="w-5 h-5 text-velora-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-velora-950">
                  Horarios de Atención para Consultas
                </span>
                <span className="text-xs text-velora-700 leading-relaxed block">
                  {config.operatingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Interactive Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-3d border border-sand-200">
              <h3 className="font-display text-xl font-black text-velora-950 mb-1">
                Envíanos tu consulta directa
              </h3>
              <p className="text-xs text-velora-700 mb-6">
                Completa tus datos y te responderemos inmediatamente a tu WhatsApp o correo con la propuesta.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-velora-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carlos Mendoza"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                      />
                    </div>
                  </div>

                  {/* Phone / Email */}
                  <div>
                    <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                      Celular / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-velora-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="+51 987 654 321"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Select */}
                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Tipo de viaje o ruta de interés
                  </label>
                  <select
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500 text-velora-900"
                  >
                    <option value="Información general sobre rutas">Información general sobre rutas</option>
                    <option value="Playas de Piura (Máncora / Los Órganos / Colán)">Playas de Piura (Máncora / Los Órganos / Colán)</option>
                    <option value="Manglares de San Pedro y Desierto de Sechura">Manglares de San Pedro y Desierto de Sechura</option>
                    <option value="Artesanía y Gastronomía en Catacaos">Artesanía y Gastronomía en Catacaos</option>
                    <option value="Viaje Romántico en Pareja">Viaje Romántico en Pareja</option>
                    <option value="Paquete Familiar o Grupal">Paquete Familiar o Grupal</option>
                    <option value="Tour Privado Personalizado">Tour Privado Personalizado</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Comentario o detalle adicional
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos fechas tentativas, número de personas o preferencias especiales..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                  />
                </div>

                {sentSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>¡Consulta enviada! Abriendo WhatsApp para coordinar tu viaje.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-velora-600 hover:bg-velora-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar consulta por WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="bg-white rounded-3xl p-5 shadow-soft-3d border border-sand-200 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-velora-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-velora-600" />
                  Mapa Regional • Piura y Playas del Norte
                </span>
                <span className="text-[10px] text-velora-600 font-semibold">
                  Punto Central: Piura, Perú
                </span>
              </div>

              {/* Styled Interactive SVG Map of Northern Peru Coastal Routes */}
              <div className="relative h-44 rounded-2xl bg-gradient-to-br from-sand-100 via-sky-50 to-sand-200 border border-sand-300 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full opacity-60" viewBox="0 0 600 200" fill="none">
                  {/* Coastline */}
                  <path
                    d="M 50,190 Q 150,140 250,110 T 450,60 T 580,20"
                    stroke="#0066FF"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  {/* Locations */}
                  <circle cx="120" cy="155" r="5" fill="#2563EB" />
                  <text x="130" y="160" fill="#0B192C" fontSize="11" fontWeight="bold">Sechura / Manglares</text>

                  <circle cx="200" cy="120" r="7" fill="#D4AF37" />
                  <text x="212" y="125" fill="#0B192C" fontSize="12" fontWeight="900">Piura (Centro de Operación)</text>

                  <circle cx="230" cy="138" r="4" fill="#2563EB" />
                  <text x="240" y="142" fill="#0B192C" fontSize="10">Catacaos</text>

                  <circle cx="160" cy="110" r="4" fill="#2563EB" />
                  <text x="120" y="100" fill="#0B192C" fontSize="10">Colán / Paita</text>

                  <circle cx="420" cy="65" r="5" fill="#2563EB" />
                  <text x="430" y="70" fill="#0B192C" fontSize="11" fontWeight="bold">Cabo Blanco / Órganos</text>

                  <circle cx="530" cy="30" r="6" fill="#2563EB" />
                  <text x="480" y="25" fill="#0B192C" fontSize="11" fontWeight="bold">Máncora</text>
                </svg>

                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] text-velora-800 font-semibold shadow-sm border border-sand-300">
                  🗺️ Mapa de rutas y balnearios de Piura
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
