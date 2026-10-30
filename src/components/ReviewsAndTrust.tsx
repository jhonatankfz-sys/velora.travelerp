import React, { useState } from 'react';
import { faqList } from '../data/faq';
import { ChevronDown, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const ReviewsAndTrust: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('todos');

  const categories = [
    { key: 'todos', label: 'Todas las preguntas' },
    { key: 'reservas', label: 'Reservas' },
    { key: 'pagos', label: 'Pagos y Abonos' },
    { key: 'transporte', label: 'Transporte y Rutas' },
    { key: 'clima', label: 'Clima y Equipaje' },
    { key: 'cancelaciones', label: 'Cancelaciones' },
  ];

  const filteredFaq = faqList.filter((item) => {
    if (selectedFaqCategory === 'todos') return true;
    return item.category === selectedFaqCategory;
  });

  const toggleQuestion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-sand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-velora-600" />
            Transparencia & Preguntas Frecuentes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Confianza, Claridad & Respuestas
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Información transparente para que planifiques tu viaje por Piura con total tranquilidad.
          </p>
        </div>

        {/* 1. Honest Reviews Placeholder Card */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-velora-900 via-velora-950 to-velora-900 text-white rounded-3xl p-8 sm:p-10 shadow-card-3d border border-velora-800 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-gold/40 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-gold" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black mb-3">
              Espacio para Reseñas Auténticas
            </h3>

            <p className="text-sm sm:text-base text-sand-200 leading-relaxed mb-6">
              En <strong>VELORA</strong> creemos en la honestidad absoluta: no inventamos testimonios, calificaciones con estrellas falsas ni reseñas simuladas. Este espacio se irá llenando con las opiniones genuinas y verificadas de cada uno de nuestros primeros viajeros en Piura.
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-gold-light">
                <Heart className="w-4 h-4 fill-gold text-gold" />
                <span>¿Vas a viajar con nosotros?</span>
              </div>
              <span className="text-sand-200">
                Tu opinión nos ayudará a construir la comunidad de viajeros más auténtica del norte.
              </span>
            </div>
          </div>
        </div>

        {/* 2. FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-velora-950 mb-2">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs sm:text-sm text-velora-700">
              Resuelve tus dudas sobre reservas, pagos, traslados, clima y políticas.
            </p>
          </div>

          {/* FAQ Category Pills */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 gap-2 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedFaqCategory(c.key)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedFaqCategory === c.key
                    ? 'bg-velora-600 text-white shadow-sm'
                    : 'bg-white text-velora-800 hover:bg-sand-200 border border-sand-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Accordion Questions */}
          <div className="space-y-3.5">
            {filteredFaq.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? 'bg-white border-velora-300 shadow-md'
                      : 'bg-white/80 border-sand-200/90 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-velora-950">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-velora-100 text-velora-700 rotate-180' : 'bg-sand-100 text-velora-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-velora-900/80 leading-relaxed border-t border-sand-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
