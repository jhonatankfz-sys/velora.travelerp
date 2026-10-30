import React, { useState } from 'react';
import type { Tour } from '../types';
import {
  X,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { buildTourWhatsAppUrl } from '../utils/whatsapp';

interface TourModalProps {
  tour: Tour | null;
  whatsappNumber: string;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({
  tour,
  whatsappNumber,
  onClose,
}) => {
  if (!tour) return null;

  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [promoCode, setPromoCode] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleBooking = () => {
    const url = buildTourWhatsAppUrl({
      phone: whatsappNumber,
      tourName: tour.name,
      date: date || 'A coordinar',
      travelersCount: travelers,
      promoCode: promoCode.trim() || undefined,
      isPrivate,
    });
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-sand-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 w-full bg-sand-200 shrink-0">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-velora-950/90 via-velora-950/40 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal de detalles del tour"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-velora-600 text-white text-xs font-bold shadow-md">
              Ruta #{tour.id} • {tour.categoryLabel}
            </span>
            {tour.badge && (
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-extrabold shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {tour.badge}
              </span>
            )}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-sand-200 mb-1.5 flex-wrap">
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {tour.location}
              </span>
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {tour.duration}
              </span>
            </div>
            <h2 id="tour-modal-title" className="font-display text-2xl sm:text-3xl font-black leading-snug">
              {tour.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Long Distance Route Alert (if applicable) */}
          {tour.longDistanceNotice && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong className="block font-bold mb-0.5 text-amber-950">
                  Ruta con desplazamiento extenso:
                </strong>
                La disponibilidad y hora de partida dependen de la ubicación de salida (Piura, Paita o Talara), el tipo de transporte asignado y la coordinación previa con el equipo de VELORA.
              </div>
            </div>
          )}

          {/* Full Description */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-velora-600 tracking-wider mb-2">
              Descripción del Itinerario
            </h4>
            <p className="text-sm sm:text-base text-velora-950 leading-relaxed">
              {tour.fullDescription}
            </p>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-velora-600 tracking-wider mb-2">
              Actividades Principales
            </h4>
            <div className="flex flex-wrap gap-2">
              {tour.activities.map((act, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-velora-50 text-velora-800 text-xs font-semibold border border-velora-200"
                >
                  ✓ {act}
                </span>
              ))}
            </div>
          </div>

          {/* Included & Not Included Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Included */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <h5 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Servicios Incluidos
              </h5>
              <ul className="space-y-1.5 text-xs text-emerald-900">
                {tour.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
              <h5 className="font-bold text-rose-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                No Incluye
              </h5>
              <ul className="space-y-1.5 text-xs text-rose-900">
                {tour.notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-velora-600 tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-velora-600" />
              Recomendaciones del Viajero
            </h4>
            <div className="p-4 rounded-xl bg-sand-100 border border-sand-200 text-xs text-velora-900 leading-relaxed space-y-1">
              {tour.recommendations.map((rec, idx) => (
                <p key={idx}>💡 {rec}</p>
              ))}
            </div>
          </div>

          {/* Terms & Demo Conditions */}
          <div className="p-3.5 rounded-xl bg-sand-100/70 text-[11px] text-velora-700 leading-relaxed border border-sand-200">
            <strong>Condiciones de reserva:</strong> {tour.conditions}
            <span className="block mt-1 text-[10px] text-velora-500">
              * Nota: Tarifas de demostración editables. Cada ruta cuenta con itinerario y condiciones particulares. La confirmación formal se realiza vía WhatsApp con el personal de VELORA.
            </span>
          </div>

          {/* Booking Configurator Form inside Modal */}
          <div className="p-5 rounded-2xl bg-velora-50 border border-velora-200">
            <h4 className="font-bold text-sm text-velora-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-velora-600" />
              Personaliza tu consulta para WhatsApp
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-velora-800 uppercase mb-1">
                  Fecha tentativa
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-velora-800 uppercase mb-1">
                  Número de personas
                </label>
                <div className="flex items-center bg-white border border-sand-300 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-velora-700 hover:bg-sand-100 rounded"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-bold text-velora-900">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers(travelers + 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-velora-700 hover:bg-sand-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-velora-800 uppercase mb-1">
                  Código promocional
                </label>
                <input
                  type="text"
                  placeholder="Ej. VELORA10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-velora-500 uppercase"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="isPrivateCheck"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded text-velora-600 focus:ring-velora-500"
              />
              <label htmlFor="isPrivateCheck" className="text-xs font-semibold text-velora-900">
                Deseo cotizar como tour privado exclusivo para mi grupo
              </label>
            </div>

            {/* Direct WhatsApp Action Button */}
            <button
              onClick={handleBooking}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Consultar y Reservar por WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-velora-600 mt-2">
              Se enviará un mensaje pre-llenado a nuestro canal oficial. La reserva queda confirmada tras la atención de un asesor de VELORA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
