import React, { useState, useMemo, useEffect } from 'react';
import type { Tour, Promotion } from '../types';
import {
  Calculator,
  Calendar,
  Users,
  Tag,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { buildQuoteWhatsAppUrl } from '../utils/whatsapp';

interface PackageCalculatorProps {
  tours: Tour[];
  promotions: Promotion[];
  whatsappNumber: string;
  initialPromoCode?: string;
}

export const PackageCalculator: React.FC<PackageCalculatorProps> = ({
  tours,
  promotions,
  whatsappNumber,
  initialPromoCode = '',
}) => {
  const [selectedTourIds, setSelectedTourIds] = useState<number[]>([1]); // Default Mancora
  const [tentativeDate, setTentativeDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [serviceType, setServiceType] = useState<'compartido' | 'privado'>('compartido');
  const [promoCodeInput, setPromoCodeInput] = useState<string>(initialPromoCode);
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // When initialPromoCode changes from external button
  useEffect(() => {
    if (initialPromoCode) {
      setPromoCodeInput(initialPromoCode);
      applyCoupon(initialPromoCode);
    }
  }, [initialPromoCode]);

  const selectedTours = useMemo(() => {
    return tours.filter((t) => selectedTourIds.includes(t.id));
  }, [tours, selectedTourIds]);

  const toggleTour = (tourId: number) => {
    if (selectedTourIds.includes(tourId)) {
      if (selectedTourIds.length > 1) {
        setSelectedTourIds(selectedTourIds.filter((id) => id !== tourId));
      }
    } else {
      setSelectedTourIds([...selectedTourIds, tourId]);
    }
  };

  const applyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || promoCodeInput).trim().toUpperCase();
    if (!code) {
      setAppliedPromo(null);
      setPromoError('');
      return;
    }

    const found = promotions.find((p) => p.code.toUpperCase() === code && p.active);
    if (!found) {
      setAppliedPromo(null);
      setPromoError('Código no válido o vencido');
      return;
    }

    const totalTravelers = adults + children;
    if (found.minTravelers && totalTravelers < found.minTravelers) {
      setAppliedPromo(null);
      setPromoError(`Este cupón requiere mínimo ${found.minTravelers} personas.`);
      return;
    }

    setAppliedPromo(found);
    setPromoError('');

    // Confetti celebratory burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore if canvas not supported
    }
  };

  // Pricing calculations
  const calculation = useMemo(() => {
    let hasCustomQuoteTour = false;
    let baseUnitTotal = 0;

    for (const t of selectedTours) {
      if (t.basePrice === null) {
        hasCustomQuoteTour = true;
      } else {
        const price = t.promoPrice || t.basePrice;
        baseUnitTotal += price;
      }
    }

    if (hasCustomQuoteTour) {
      return {
        subtotal: 0,
        discount: 0,
        total: null,
        hasCustomQuoteTour: true,
      };
    }

    // Children pay 80% of adult rate
    const adultFactor = adults;
    const childFactor = children * 0.8;
    const travelersFactor = adultFactor + childFactor;

    // Private tour has a 25% premium for exclusive vehicle and flexibility
    const privateMultiplier = serviceType === 'privado' ? 1.25 : 1.0;

    const subtotal = baseUnitTotal * travelersFactor * privateMultiplier;

    let discount = 0;
    if (appliedPromo && appliedPromo.discountPercentage) {
      discount = (subtotal * appliedPromo.discountPercentage) / 100;
    }

    const total = Math.max(0, subtotal - discount);

    return {
      subtotal,
      discount,
      total,
      hasCustomQuoteTour: false,
    };
  }, [selectedTours, adults, children, serviceType, appliedPromo]);

  const handleSendWhatsApp = () => {
    const url = buildQuoteWhatsAppUrl({
      phone: whatsappNumber,
      selectedTours: selectedTours.map((t) => t.name),
      tentativeDate,
      adults,
      children,
      serviceType,
      promoCode: appliedPromo ? appliedPromo.code : undefined,
      subtotal: calculation.subtotal,
      discount: calculation.discount,
      total: calculation.total,
    });
    window.open(url, '_blank');
  };

  return (
    <section id="cotizador" className="py-20 bg-sand-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-velora-600" />
            Cotizador Inteligente
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight">
            Diseña tu Paquete a Medida
          </h2>
          <p className="mt-4 text-base sm:text-lg text-velora-900/70">
            Selecciona una o más rutas, fecha aproximada, número de viajeros y obtén un estimado inmediato listo para enviar por WhatsApp.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-soft-3d border border-sand-200/90 space-y-6">
            {/* Step 1: Tour Selector */}
            <div>
              <label className="block text-xs uppercase font-extrabold text-velora-900 tracking-wider mb-2">
                1. Selecciona tus Rutas o Experiencias (puedes combinar más de una):
              </label>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 border border-sand-200 rounded-2xl p-2 bg-sand-50/50">
                {tours.map((tour) => {
                  const isSelected = selectedTourIds.includes(tour.id);
                  return (
                    <div
                      key={tour.id}
                      onClick={() => toggleTour(tour.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-velora-50 border-2 border-velora-500 shadow-sm'
                          : 'bg-white hover:bg-sand-100 border border-sand-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-velora-600 text-white'
                              : 'border border-sand-400 bg-white'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-velora-950">
                            #{tour.id} {tour.name}
                          </p>
                          <span className="text-[11px] text-velora-600">
                            {tour.categoryLabel} • {tour.duration}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        {tour.basePrice !== null ? (
                          <span className="text-xs sm:text-sm font-extrabold text-velora-900">
                            S/. {tour.promoPrice || tour.basePrice}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            A cotizar
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Tentative Date & Travel Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-extrabold text-velora-900 tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-velora-600" />
                  2. Fecha tentativa
                </label>
                <input
                  type="date"
                  value={tentativeDate}
                  onChange={(e) => setTentativeDate(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-sand-300 bg-sand-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-velora-900 tracking-wider mb-2">
                  3. Tipo de Servicio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('compartido')}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                      serviceType === 'compartido'
                        ? 'bg-velora-600 text-white border-velora-600 shadow'
                        : 'bg-white text-velora-800 border-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    Compartido
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('privado')}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                      serviceType === 'privado'
                        ? 'bg-velora-600 text-white border-velora-600 shadow'
                        : 'bg-white text-velora-800 border-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    Privado (+25%)
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Travelers Counter */}
            <div>
              <label className="block text-xs uppercase font-extrabold text-velora-900 tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-velora-600" />
                4. Número de viajeros
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Adults */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-sand-50 border border-sand-200">
                  <div>
                    <span className="block text-xs font-bold text-velora-950">Adultos</span>
                    <span className="text-[10px] text-velora-600">Tarifa completa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-sand-300 text-velora-800 font-bold hover:bg-sand-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-extrabold text-velora-900">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-sand-300 text-velora-800 font-bold hover:bg-sand-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-sand-50 border border-sand-200">
                  <div>
                    <span className="block text-xs font-bold text-velora-950">Niños (hasta 11 años)</span>
                    <span className="text-[10px] text-velora-600">Tarifa preferencial (20% desc.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-sand-300 text-velora-800 font-bold hover:bg-sand-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-extrabold text-velora-900">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-sand-300 text-velora-800 font-bold hover:bg-sand-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Promo Code Input */}
            <div>
              <label className="block text-xs uppercase font-extrabold text-velora-900 tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-gold-dark" />
                5. ¿Tienes un código de promoción?
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej. VELORA10, PLAYA15, GRUPO15"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 text-sm p-3 rounded-xl border border-sand-300 bg-sand-50/50 uppercase font-mono tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-velora-500"
                />
                <button
                  type="button"
                  onClick={() => applyCoupon()}
                  className="px-5 py-3 rounded-xl bg-velora-900 hover:bg-velora-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Aplicar
                </button>
              </div>

              {appliedPromo && (
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    ¡Código <strong>{appliedPromo.code}</strong> aplicado con éxito! ({appliedPromo.discountPercentage}% de descuento).
                  </span>
                </div>
              )}

              {promoError && (
                <div className="mt-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{promoError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary & WhatsApp Send (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-velora-900 to-velora-950 text-white rounded-3xl p-6 sm:p-8 shadow-card-3d border border-velora-800 flex flex-col justify-between sticky top-28">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-xs uppercase tracking-wider text-sand-300 font-bold block">
                    Resumen Estimado
                  </span>
                  <h3 className="font-display text-xl font-black text-white">
                    Cotización VELORA
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-white/5">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
              </div>

              {/* Selected Tours List in Quote */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] text-sky-300 uppercase tracking-wider font-bold">
                  Rutas seleccionadas ({selectedTours.length}):
                </span>
                <ul className="space-y-1.5 text-xs text-sand-200">
                  {selectedTours.map((t) => (
                    <li key={t.id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <span className="truncate pr-2">• {t.name}</span>
                      <span className="font-bold shrink-0">
                        {t.basePrice !== null ? `S/. ${t.promoPrice || t.basePrice}` : 'A cotizar'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-sand-200 border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between">
                  <span>Modalidad:</span>
                  <span className="font-semibold text-white capitalize">
                    Tour {serviceType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Viajeros:</span>
                  <span className="font-semibold text-white">
                    {adults} adulto(s) {children > 0 ? `+ ${children} niño(s)` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fecha tentativa:</span>
                  <span className="font-semibold text-white">
                    {tentativeDate || 'A coordinar'}
                  </span>
                </div>

                {calculation.subtotal > 0 && (
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span>Subtotal estimado:</span>
                    <span className="font-bold text-white">
                      S/. {calculation.subtotal.toFixed(2)}
                    </span>
                  </div>
                )}

                {calculation.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento aplicado:</span>
                    <span className="font-bold">
                      - S/. {calculation.discount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Display */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/15">
                <span className="text-[11px] uppercase tracking-wider text-sand-300 block mb-1">
                  Total Estimado en Soles:
                </span>
                {calculation.total !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      S/. {calculation.total.toFixed(2)}
                    </span>
                    <span className="text-xs text-sky-300 font-semibold">PEN</span>
                  </div>
                ) : (
                  <div className="text-amber-300 font-bold text-lg">
                    Solicitar Cotización Personalizada
                  </div>
                )}
                <span className="text-[10px] text-sand-300 block mt-1">
                  * Tarifa de demostración orientativa. Sujeto a disponibilidad de movilidad.
                </span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar cotización por WhatsApp</span>
              </button>

              <div className="flex items-start gap-2 text-[10px] text-sand-300/80 leading-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Una solicitud enviada no equivale a una reserva confirmada. La confirmación oficial y detalles finales serán brindados por el personal de VELORA vía WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
