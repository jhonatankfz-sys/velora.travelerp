import React, { useState } from 'react';
import { initialConfig } from '../data/config';
import type { VeloraConfig } from '../data/config';
import type { Promotion, Tour } from '../types';
import {
  X,
  Settings,
  Phone,
  Tag,
  Database,
  RotateCcw,
  Save,
  CheckCircle,
  ShieldAlert,
  Edit3,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: VeloraConfig;
  onSaveConfig: (newConfig: VeloraConfig) => void;
  promotions: Promotion[];
  onSavePromotions: (newPromos: Promotion[]) => void;
  tours: Tour[];
  onSaveTours: (newTours: Tour[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  promotions,
  onSavePromotions,
  tours,
  onSaveTours,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'contacto' | 'promociones' | 'tarifas' | 'backend'>('contacto');

  // Contact State
  const [formData, setFormData] = useState<VeloraConfig>({ ...config });
  const [promoList, setPromoList] = useState<Promotion[]>([...promotions]);
  const [tourList, setTourList] = useState<Tour[]>([...tours]);
  const [tourSearch, setTourSearch] = useState('');
  const [saveFeedback, setSaveFeedback] = useState(false);

  const handleSaveAll = () => {
    onSaveConfig(formData);
    onSavePromotions(promoList);
    onSaveTours(tourList);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restablecer toda la configuración y precios a los valores iniciales de demostración?')) {
      localStorage.removeItem('velora_site_config');
      localStorage.removeItem('velora_promotions');
      localStorage.removeItem('velora_custom_tours');
      setFormData(initialConfig);
      onSaveConfig(initialConfig);
      window.location.reload();
    }
  };

  const togglePromoActive = (id: string) => {
    setPromoList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const updateTourPrice = (tourId: number, newPrice: number | null) => {
    setTourList((prev) =>
      prev.map((t) => (t.id === tourId ? { ...t, basePrice: newPrice } : t))
    );
  };

  const filteredTours = tourList.filter((t) =>
    t.name.toLowerCase().includes(tourSearch.toLowerCase()) ||
    t.id.toString() === tourSearch
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-sand-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-velora-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-velora-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-velora-800 flex items-center justify-center text-gold border border-gold/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 id="admin-modal-title" className="font-display font-extrabold text-xl text-white">
                Panel de Administración & Configuración
              </h2>
              <p className="text-xs text-sand-300">
                Gestión en vivo de WhatsApp, promociones, tarifas y arquitectura de datos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar panel de administración"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-sand-100 px-6 pt-3 border-b border-sand-300 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('contacto')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'contacto'
                ? 'border-velora-600 text-velora-900 bg-white rounded-t-lg'
                : 'border-transparent text-velora-700 hover:text-velora-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contacto & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('promociones')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'promociones'
                ? 'border-velora-600 text-velora-900 bg-white rounded-t-lg'
                : 'border-transparent text-velora-700 hover:text-velora-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Promociones (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('tarifas')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'tarifas'
                ? 'border-velora-600 text-velora-900 bg-white rounded-t-lg'
                : 'border-transparent text-velora-700 hover:text-velora-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Tarifas de Rutas (50)</span>
          </button>

          <button
            onClick={() => setActiveTab('backend')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'backend'
                ? 'border-velora-600 text-velora-900 bg-white rounded-t-lg'
                : 'border-transparent text-velora-700 hover:text-velora-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Arquitectura Backend</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CONTACTO & WHATSAPP */}
          {activeTab === 'contacto' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                💡 Los cambios que guardes aquí se aplican inmediatamente a todos los enlaces de WhatsApp y datos de contacto de la página web.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Número de WhatsApp (con código de país sin +)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappNumber: e.target.value.replace(/\D/g, '') })
                    }
                    className="w-full text-sm p-3 rounded-xl border border-sand-300 font-mono"
                    placeholder="51973000000"
                  />
                  <span className="text-[10px] text-velora-600">
                    Ejemplo para Perú: 51 seguido de los 9 dígitos de celular.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Texto Visible de WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappDisplay}
                    onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-sand-300"
                    placeholder="+51 973 000 000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Enlace de Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-sand-300"
                    placeholder="https://www.instagram.com/velora_rutas/"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Handle de Instagram (@)
                  </label>
                  <input
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-sand-300"
                    placeholder="@velora_rutas"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-velora-900 uppercase mb-1">
                    Horarios de Atención
                  </label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-sand-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMOCIONES */}
          {activeTab === 'promociones' && (
            <div className="space-y-4">
              <p className="text-xs text-velora-700">
                Habilita, deshabilita o ajusta los porcentajes de descuento y códigos activos.
              </p>

              <div className="space-y-3">
                {promoList.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs bg-velora-100 text-velora-800 px-2 py-0.5 rounded">
                          {promo.code}
                        </span>
                        <h4 className="font-bold text-sm text-velora-950">
                          {promo.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            promo.active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sand-200 text-sand-600'
                          }`}
                        >
                          {promo.active ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                      <p className="text-xs text-velora-700 mt-1">{promo.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-velora-600">Desc:</span>
                        <input
                          type="number"
                          value={promo.discountPercentage || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setPromoList((prev) =>
                              prev.map((p) =>
                                p.id === promo.id ? { ...p, discountPercentage: val } : p
                              )
                            );
                          }}
                          className="w-16 p-1.5 text-xs rounded border border-sand-300 font-bold text-center"
                        />
                        <span>%</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => togglePromoActive(promo.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          promo.active
                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        {promo.active ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TARIFAS DE RUTAS */}
          {activeTab === 'tarifas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Buscar ruta por nombre o número (#)..."
                  value={tourSearch}
                  onChange={(e) => setTourSearch(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                />
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 border border-sand-200 rounded-2xl p-2 bg-sand-50">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="p-3 bg-white rounded-xl border border-sand-200 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="flex-1">
                      <span className="font-bold text-velora-950">
                        #{tour.id} {tour.name}
                      </span>
                      <span className="block text-[11px] text-velora-600">
                        {tour.categoryLabel} • {tour.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-velora-600 font-semibold">S/.</span>
                      <input
                        type="number"
                        placeholder="N/A"
                        value={tour.basePrice === null ? '' : tour.basePrice}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseFloat(e.target.value);
                          updateTourPrice(tour.id, val);
                        }}
                        className="w-20 p-1.5 text-xs rounded border border-sand-300 font-bold text-right"
                      />
                      <span className="text-[10px] text-velora-500">PEN</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ARQUITECTURA BACKEND */}
          {activeTab === 'backend' && (
            <div className="space-y-4 text-xs text-velora-900 leading-relaxed">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-1.5 text-amber-950">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Arquitectura Segura y Sin Contraseñas Falsas en Frontend
                </h4>
                <p>
                  Cumpliendo las directrices del proyecto, no se almacenan contraseñas en el frontend ni se simula una seguridad inexistente.
                  La aplicación almacena de forma persistente la configuración en <code>localStorage</code> del cliente y deja la arquitectura lista para enlazar una base de datos real.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sand-100 border border-sand-200 font-mono text-[11px] space-y-2">
                <p className="font-bold text-velora-950">Esquema preparado para Base de Datos:</p>
                <pre className="text-velora-800 bg-white p-3 rounded-lg overflow-x-auto">
{`// Tablas recomendadas (PostgreSQL / Supabase):
TABLE tours (
  id INT PRIMARY KEY,
  slug VARCHAR(120),
  name VARCHAR(255),
  category VARCHAR(50),
  base_price DECIMAL(10,2),
  promo_price DECIMAL(10,2),
  duration VARCHAR(100),
  active BOOLEAN DEFAULT true
);

TABLE promotions (
  id VARCHAR(50) PRIMARY KEY,
  code VARCHAR(30) UNIQUE,
  discount_percentage INT,
  expiration_date DATE,
  active BOOLEAN DEFAULT true
);`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-sand-100 p-4 sm:p-5 border-t border-sand-300 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer valores de muestra</span>
          </button>

          <div className="flex items-center gap-3">
            {saveFeedback && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                ¡Cambios guardados con éxito!
              </span>
            )}

            <button
              type="button"
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-velora-600 hover:bg-velora-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
