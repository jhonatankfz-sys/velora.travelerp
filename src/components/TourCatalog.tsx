import React, { useState, useMemo } from 'react';
import type { Tour, TourCategory } from '../types';
import { TourCard3D } from './TourCard3D';
import { Search, Compass, Sparkles, X } from 'lucide-react';

interface TourCatalogProps {
  tours: Tour[];
  whatsappNumber: string;
  selectedCategory: TourCategory | 'all';
  onCategoryChange: (category: TourCategory | 'all') => void;
  onOpenModal: (tour: Tour) => void;
  externalSearch?: string;
  onClearExternalSearch?: () => void;
}

export const TourCatalog: React.FC<TourCatalogProps> = ({
  tours,
  whatsappNumber,
  selectedCategory,
  onCategoryChange,
  onOpenModal,
  externalSearch,
  onClearExternalSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(externalSearch || '');
  const [durationFilter, setDurationFilter] = useState<'all' | 'fullday' | 'mediodia'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sync if externalSearch changes
  React.useEffect(() => {
    if (externalSearch !== undefined) {
      setSearchTerm(externalSearch);
    }
  }, [externalSearch]);

  const categories: { key: TourCategory | 'all'; label: string; count: number }[] = [
    { key: 'all', label: 'Todas las 50 Rutas', count: tours.length },
    { key: 'playas', label: 'Playas de Piura', count: tours.filter((t) => t.category === 'playas').length },
    { key: 'naturaleza', label: 'Naturaleza & Aventura', count: tours.filter((t) => t.category === 'naturaleza').length },
    { key: 'cultura', label: 'Cultura & Historia', count: tours.filter((t) => t.category === 'cultura').length },
    { key: 'gastronomia', label: 'Gastronomía Norteña', count: tours.filter((t) => t.category === 'gastronomia').length },
    { key: 'especiales', label: 'Experiencias Especiales', count: tours.filter((t) => t.category === 'especiales').length },
  ];

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Category filter
      if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = tour.name.toLowerCase().includes(query);
        const matchesLoc = tour.location.toLowerCase().includes(query);
        const matchesDesc = tour.shortDescription.toLowerCase().includes(query);
        const matchesActs = tour.activities.some((act) => act.toLowerCase().includes(query));
        if (!matchesName && !matchesLoc && !matchesDesc && !matchesActs) {
          return false;
        }
      }

      // Duration filter
      if (durationFilter === 'fullday' && !tour.duration.toLowerCase().includes('full day') && !tour.duration.toLowerCase().includes('días')) {
        return false;
      }
      if (durationFilter === 'mediodia' && !tour.duration.toLowerCase().includes('medio') && !tour.duration.toLowerCase().includes('horas') && !tour.duration.toLowerCase().includes('tarde') && !tour.duration.toLowerCase().includes('mañana')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.promoPrice || a.basePrice || 9999;
        const priceB = b.promoPrice || b.basePrice || 9999;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.promoPrice || a.basePrice || -1;
        const priceB = b.promoPrice || b.basePrice || -1;
        return priceB - priceA;
      }
      return a.id - b.id;
    });
  }, [tours, selectedCategory, searchTerm, durationFilter, sortBy]);

  const displayedTours = filteredTours.slice(0, visibleCount);

  return (
    <section id="rutas" className="py-20 bg-sand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-velora-600" />
            Catálogo Oficial de Recorridos
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            50 Rutas & Experiencias en Piura
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Cada viaje es único. Elige entre nuestras rutas costeras, aventuras en el desierto y manglares, circuitos de artesanía y banquetes de cocina norteña.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                onCategoryChange(cat.key);
                setVisibleCount(12);
              }}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.key
                  ? 'bg-velora-600 text-white shadow-glow-blue scale-105'
                  : 'bg-white text-velora-800 hover:bg-sand-200 border border-sand-300/80 shadow-sm'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  selectedCategory === cat.key
                    ? 'bg-white/20 text-white'
                    : 'bg-sand-200 text-velora-700'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-soft-3d border border-sand-200/90 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-velora-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, playa, Catacaos, ceviche, manglar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full pl-11 pr-10 py-2.5 text-sm rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    if (onClearExternalSearch) onClearExternalSearch();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-velora-400 hover:text-velora-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Duration Filter */}
            <div className="md:col-span-3">
              <select
                value={durationFilter}
                onChange={(e) => {
                  setDurationFilter(e.target.value as any);
                  setVisibleCount(12);
                }}
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm font-semibold rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500 text-velora-900"
              >
                <option value="all">Todas las duraciones</option>
                <option value="fullday">Full Day / Día completo</option>
                <option value="mediodia">Medio Día / Horas</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm font-semibold rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500 text-velora-900"
              >
                <option value="default">Orden por catálogo (1-50)</option>
                <option value="price-asc">Precio: de menor a mayor</option>
                <option value="price-desc">Precio: de mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Active Results Summary */}
          <div className="mt-3 pt-3 border-t border-sand-200 flex flex-wrap items-center justify-between text-xs text-velora-700 gap-2">
            <span>
              Mostrando <strong>{displayedTours.length}</strong> de <strong>{filteredTours.length}</strong> rutas encontradas
            </span>
            <span className="text-[11px] text-velora-500 italic">
              * Tarifas de demostración editables. Cada ruta dispone de itinerario propio.
            </span>
          </div>
        </div>

        {/* Tours Grid */}
        {displayedTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedTours.map((tour) => (
              <TourCard3D
                key={tour.id}
                tour={tour}
                whatsappNumber={whatsappNumber}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 shadow-sm">
            <Compass className="w-12 h-12 text-velora-400 mx-auto mb-3 animate-spin" />
            <h3 className="font-display text-xl font-bold text-velora-900 mb-2">
              No encontramos rutas con ese criterio
            </h3>
            <p className="text-sm text-velora-700 max-w-md mx-auto mb-5">
              Prueba buscando otro término o restablece los filtros para ver las 50 opciones.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setDurationFilter('all');
                onCategoryChange('all');
                if (onClearExternalSearch) onClearExternalSearch();
              }}
              className="px-5 py-2.5 rounded-xl bg-velora-600 text-white font-bold text-sm shadow hover:bg-velora-700"
            >
              Ver todas las 50 rutas
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredTours.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredTours.length))}
              className="px-8 py-3.5 rounded-2xl bg-velora-900 hover:bg-velora-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>
                Cargar más rutas ({filteredTours.length - visibleCount} restantes)
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
