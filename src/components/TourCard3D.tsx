import React, { useRef, useState } from 'react';
import type { Tour } from '../types';
import { Clock, MapPin, MessageCircle, Eye, Sparkles } from 'lucide-react';
import { buildTourWhatsAppUrl } from '../utils/whatsapp';

interface TourCard3DProps {
  tour: Tour;
  whatsappNumber: string;
  onOpenModal: (tour: Tour) => void;
}

export const TourCard3D: React.FC<TourCard3DProps> = ({
  tour,
  whatsappNumber,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Slight 3D rotation angle (max 7 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -7;
    const rotateYValue = ((x - centerX) / centerX) * 7;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildTourWhatsAppUrl({
      phone: whatsappNumber,
      tourName: tour.name,
      travelersCount: 2,
    });
    window.open(url, '_blank');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-2xl bg-white shadow-soft-3d hover:shadow-card-3d border border-sand-200/90 overflow-hidden flex flex-col justify-between cursor-pointer transition-shadow"
      onClick={() => onOpenModal(tour)}
    >
      {/* Top Image Container */}
      <div className="relative h-52 overflow-hidden bg-sand-200">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velora-950/80 via-transparent to-black/20" />

        {/* Tour Number and Category */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full bg-velora-900/90 backdrop-blur-md text-white text-[11px] font-black flex items-center justify-center border border-white/30">
            #{tour.id}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-velora-900 text-[11px] font-bold shadow-sm">
            {tour.categoryLabel}
          </span>
        </div>

        {/* Badge */}
        {tour.badge && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[11px] font-extrabold shadow-md">
              <Sparkles className="w-3 h-3" />
              {tour.badge}
            </span>
          </div>
        )}

        {/* Location & Duration Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-sky-300" />
            <span className="truncate max-w-[130px]">{tour.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{tour.duration}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-velora-950 group-hover:text-velora-600 transition-colors line-clamp-1 mb-1.5">
            {tour.name}
          </h3>

          <p className="text-xs text-velora-900/70 line-clamp-2 leading-relaxed mb-3">
            {tour.shortDescription}
          </p>

          {/* Activities Pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tour.activities.slice(0, 3).map((act, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-sand-100 text-velora-800 font-medium px-2 py-0.5 rounded"
              >
                • {act}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-sand-200">
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] text-velora-600 font-semibold uppercase tracking-wider">
              {tour.basePrice !== null ? 'Tarifa referencial / pers.' : 'Tarifa personalizada'}
            </span>

            <div className="text-right">
              {tour.basePrice !== null ? (
                <div>
                  {tour.promoPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-velora-400 line-through">
                        S/. {tour.basePrice}
                      </span>
                      <span className="text-xl font-extrabold text-velora-600">
                        S/. {tour.promoPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-extrabold text-velora-900">
                      S/. {tour.basePrice}
                    </span>
                  )}
                  <span className="text-[10px] text-velora-600 block">Soles (PEN)</span>
                </div>
              ) : (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                  Solicitar cotización
                </span>
              )}
            </div>
          </div>

          {/* Buttons: Ver Itinerario & Reservar por WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenModal(tour)}
              className="py-2 px-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-velora-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-velora-600" />
              <span>Ver Itinerario</span>
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
