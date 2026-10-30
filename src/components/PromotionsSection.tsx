import React, { useState } from 'react';
import type { Promotion } from '../types';
import { Tag, Copy, Check, Sparkles, AlertCircle, ArrowRight, Gift } from 'lucide-react';

interface PromotionsSectionProps {
  promotions: Promotion[];
  onApplyPromoToCalculator: (code: string) => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  promotions,
  onApplyPromoToCalculator,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="promociones" className="py-20 bg-gradient-to-b from-sand-50 via-sand-100/70 to-sand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold tracking-widest uppercase mb-3 border border-gold/30">
            <Gift className="w-3.5 h-3.5" />
            Beneficios Exclusivos
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Ofertas que te llevan más lejos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Aprovecha nuestros códigos promocionales para viajar en pareja, en grupo de amigos o planificar tu escapada con anticipación.
          </p>

          {/* Mandatory visible disclaimer */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Nota: Promociones de ejemplo sujetas a confirmación por VELORA.</span>
          </div>
        </div>

        {/* Promotions Grid (8 promotions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl bg-white p-6 shadow-soft-3d hover:shadow-card-3d border border-sand-200/90 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-velora-600 via-sky-400 to-gold rounded-t-2xl" />

              <div>
                {/* Tag & Discount Percentage */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-md bg-sand-100 text-velora-800">
                    {promo.tag}
                  </span>
                  {promo.discountPercentage && (
                    <span className="text-xl font-black text-velora-600">
                      -{promo.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Promo Title */}
                <h3 className="font-display text-lg font-bold text-velora-950 mb-2 group-hover:text-velora-600 transition-colors">
                  {promo.title}
                </h3>

                {/* Promo Description */}
                <p className="text-xs text-velora-900/75 leading-relaxed mb-4">
                  {promo.description}
                </p>

                {/* Conditions brief */}
                <div className="text-[11px] text-velora-600/90 bg-sand-50 p-2.5 rounded-lg border border-sand-200 mb-5 leading-normal">
                  <span className="font-semibold text-velora-800">Condición:</span> {promo.conditions}
                </div>
              </div>

              {/* Bottom Promo Code & Buttons */}
              <div className="space-y-2 pt-2 border-t border-sand-200/80">
                {/* Code Copy Box */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-sand-100 border border-dashed border-sand-400">
                  <div className="flex items-center gap-1.5 pl-1">
                    <Tag className="w-3.5 h-3.5 text-gold-dark" />
                    <span className="font-mono font-black text-xs text-velora-950 tracking-wider">
                      {promo.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="p-1.5 rounded-lg bg-white hover:bg-velora-50 text-velora-800 hover:text-velora-600 text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm"
                    title="Copiar código al portapapeles"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Apply in Calculator Button */}
                <button
                  onClick={() => onApplyPromoToCalculator(promo.code)}
                  className="w-full py-2 px-3 rounded-xl bg-velora-900 hover:bg-velora-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Aplicar en cotizador</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
