import React from 'react';
import { featuredDestinations } from '../data/destinations';
import { Clock, ArrowUpRight, MapPin } from 'lucide-react';

interface FeaturedDestinationsProps {
  onSelectDestinationTours: (searchTerm: string) => void;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  onSelectDestinationTours,
}) => {
  return (
    <section id="destinos" className="py-20 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-velora-600" />
            Litoral & Tesoros del Norte
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Destinos Destacados
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Desde las olas y atardeceres de Máncora hasta el santuario natural de los Manglares de San Pedro. Conoce los escenarios naturales más fascinantes de Piura.
          </p>
        </div>

        {/* 3D Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-soft-3d hover:shadow-card-3d transition-all duration-500 transform hover:-translate-y-2 border border-sand-200/80 flex flex-col"
            >
              {/* Image Container with 3D Zoom Effect */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velora-950/80 via-velora-950/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-velora-900/80 backdrop-blur-md text-white text-xs font-bold border border-gold/40 shadow-sm">
                    {dest.badge}
                  </span>
                </div>

                {/* Distance Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-sky-300" />
                    <span>{dest.distanceFromPiura}</span>
                  </div>
                </div>
              </div>

              {/* Destination Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-velora-950 group-hover:text-velora-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs font-semibold text-velora-600 mb-2 uppercase tracking-wide">
                    {dest.subtitle}
                  </p>
                  <p className="text-sm text-velora-900/75 leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium bg-sand-200 text-velora-800 px-2.5 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action: filter catalog for this destination */}
                <button
                  onClick={() => onSelectDestinationTours(dest.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sand-100 hover:bg-velora-600 text-velora-900 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Ver tours en {dest.name}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
