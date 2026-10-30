import React, { useState } from 'react';
import { galleryItems } from '../data/gallery';
import type { GalleryItem } from '../types';
import { Camera, X, MapPin, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('todas');

  const tabs = [
    { key: 'todas', label: 'Todas las Postales' },
    { key: 'playas', label: 'Playas & Olas' },
    { key: 'naturaleza', label: 'Naturaleza & Desierto' },
    { key: 'artesania', label: 'Artesanía' },
    { key: 'gastronomia', label: 'Gastronomía' },
    { key: 'aventura', label: 'Aventura & Foto' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'todas') return true;
    return item.category === activeTab;
  });

  return (
    <section id="galeria" className="py-20 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-velora-600" />
            Galería Visual
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Postales del Norte Peruano
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Un vistazo a los paisajes dorados, playas turquesas, arquitectura colonial y expresiones gastronómicas de la región Piura.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-10 gap-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-velora-600 text-white shadow-md'
                  : 'bg-white text-velora-800 hover:bg-sand-200 border border-sand-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isFeatured = index === 0 || index === 4;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-3xl overflow-hidden bg-sand-200 shadow-soft-3d hover:shadow-card-3d cursor-pointer border border-sand-200/90 transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isFeatured ? 'lg:col-span-2 sm:col-span-2' : ''
                }`}
              >
                <div className={`relative ${isFeatured ? 'h-80 sm:h-96' : 'h-72'} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-velora-950/85 via-velora-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Location Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {item.location}
                    </span>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Title & Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display font-bold text-lg sm:text-xl mb-1 group-hover:text-sand-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-sand-200/90 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Disclaimer */}
        <div className="mt-8 text-center text-xs text-velora-600/80">
          📷 Fotografías de referencia paisajística representativas de los balnearios, valles y desiertos de Piura.
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-velora-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-velora-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar modal de imagen ampliada"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="p-6 bg-velora-900 border-t border-velora-800">
              <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedImage.location}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-sand-200 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
