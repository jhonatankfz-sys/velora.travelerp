import type { Promotion } from '../types';

export const initialPromotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Escapada Playera",
    discountPercentage: 15,
    tag: "Ahorra en tu próxima aventura",
    description: "Descuento del 15% para rutas seleccionadas a las mejores playas de Piura: Máncora, Los Órganos, Vichayito y Colán.",
    code: "PLAYA15",
    applicableCategories: ["playas"],
    minTravelers: 2,
    conditions: "Válido para reservas con mínimo 2 pasajeros en rutas de la categoría Playas de Piura. No acumulable con otras promociones.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-2",
    title: "Viaje en Pareja",
    discountPercentage: 10,
    tag: "Experiencia Romántica",
    description: "Descuento del 10% por paquete en experiencias románticas, paseos al atardecer frente al mar y sesiones fotográficas.",
    code: "PAREJA10",
    applicableCategories: ["playas", "especiales"],
    minTravelers: 2,
    conditions: "Aplica en recorridos en pareja y rutas de atardecer. Incluye asesoría fotográfica durante el itinerario.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-3",
    title: "Grupos de Amigos",
    discountPercentage: 15,
    tag: "Para grupos desde 5",
    description: "15% de descuento especial para grupos desde 5 personas en tours seleccionados de aventura y circuitos costeros.",
    code: "GRUPO15",
    applicableCategories: ["playas", "naturaleza", "especiales"],
    minTravelers: 5,
    conditions: "Válido para grupos de 5 a más personas reservando el mismo itinerario. Sujeto a disponibilidad de movilidad.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-4",
    title: "Aventura Familiar",
    discountPercentage: 12,
    tag: "Familias con niños",
    description: "Tarifa preferencial con 12% de descuento para grupos familiares con niños en rutas seguras, culturales y de playas tranquilas.",
    code: "FAMILIA12",
    applicableCategories: ["playas", "cultura", "especiales"],
    minTravelers: 4,
    conditions: "Aplica en reservas de mínimo 4 viajeros (con al menos 1 menor de 12 años). Incluye paradas con fácil acceso.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-5",
    title: "Pack Fin de Semana",
    discountPercentage: 20,
    tag: "Doble experiencia",
    description: "Reserva dos experiencias turísticas combinadas (ej. Playa + Gastronomía en Catacaos) y accede a un 20% de descuento global.",
    code: "FINDE20",
    applicableCategories: ["playas", "cultura", "gastronomia", "especiales"],
    minTravelers: 2,
    conditions: "Aplica para reservas que combinen 2 recorridos en un mismo fin de semana (sábado y domingo).",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-6",
    title: "Reserva Anticipada",
    discountPercentage: 10,
    tag: "Planifica y ahorra",
    description: "10% de descuento reservando tu aventura con al menos 15 días de anticipación sobre el itinerario seleccionado.",
    code: "VELORA10",
    applicableCategories: ["playas", "naturaleza", "cultura", "gastronomia", "especiales"],
    minTravelers: 1,
    conditions: "Válido reservando con 15 o más días de antelación respecto a la fecha del tour. Sujeto a cupos por fecha.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-7",
    title: "Clientes Frecuentes",
    discountPercentage: 15,
    tag: "Viajeros de regreso",
    description: "Beneficio exclusivo del 15% para viajeros que vuelven a coordinar una nueva ruta con nosotros tras su primer recorrido.",
    code: "FRECUENTE15",
    applicableCategories: ["playas", "naturaleza", "cultura", "gastronomia", "especiales"],
    minTravelers: 1,
    conditions: "Presentando el código de confirmación del servicio previo con VELORA. No transferible.",
    expirationDate: "31/12/2026",
    active: true,
  },
  {
    id: "promo-8",
    title: "Temporada Especial",
    discountPercentage: 18,
    tag: "Campañas festivas",
    description: "Campaña de temporada para vacaciones, feriados nacionales y fechas festivas en circuitos de norte piurano.",
    code: "VERANO2026",
    applicableCategories: ["playas", "naturaleza", "gastronomia"],
    minTravelers: 2,
    conditions: "Tarifa promocional temporal de temporada alta. Cupos diarios limitados según aforo.",
    expirationDate: "31/12/2026",
    active: true,
  }
];

export const getStoredPromotions = (): Promotion[] => {
  if (typeof window === 'undefined') return initialPromotions;
  try {
    const saved = localStorage.getItem('velora_promotions');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading promotions from localStorage', e);
  }
  return initialPromotions;
};

export const savePromotions = (promos: Promotion[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('velora_promotions', JSON.stringify(promos));
  }
};
