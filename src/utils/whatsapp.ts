/**
 * Helper to build well-formatted WhatsApp URLs according to VELORA specification:
 * "Hola, VELORA. Quiero información para reservar el tour [nombre del tour]. 
 * Fecha tentativa: [fecha]. Número de viajeros: [cantidad]. Código promocional: [código]. 
 * Por favor, envíenme disponibilidad y precio final."
 */

export interface TourBookingParams {
  phone: string;
  tourName: string;
  date?: string;
  travelersCount?: number | string;
  promoCode?: string;
  isPrivate?: boolean;
}

export interface QuoteBookingParams {
  phone: string;
  selectedTours: string[];
  destination?: string;
  tentativeDate: string;
  adults: number;
  children: number;
  serviceType: 'compartido' | 'privado';
  promoCode?: string;
  subtotal: number;
  discount: number;
  total: number | null;
}

export function buildTourWhatsAppUrl({
  phone,
  tourName,
  date,
  travelersCount,
  promoCode,
  isPrivate
}: TourBookingParams): string {
  const cleanPhone = (phone || '51950831602').replace(/\D/g, '') || '51950831602';
  const fecha = date && date.trim() ? date : '[a coordinar]';
  const viajeros = travelersCount || 2;
  const codigo = promoCode && promoCode.trim() ? promoCode.toUpperCase() : 'Ninguno';
  const modalidad = isPrivate ? ' (Servicio Privado)' : ' (Servicio Estándar)';

  const text = `Hola, VELORA. Quiero información para reservar el tour *${tourName}*${modalidad}.\n\n` +
    `• *Fecha tentativa:* ${fecha}\n` +
    `• *Número de viajeros:* ${viajeros}\n` +
    `• *Código promocional:* ${codigo}\n\n` +
    `Por favor, envíenme disponibilidad y precio final.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function buildQuoteWhatsAppUrl({
  phone,
  selectedTours,
  destination,
  tentativeDate,
  adults,
  children,
  serviceType,
  promoCode,
  subtotal,
  discount,
  total
}: QuoteBookingParams): string {
  const cleanPhone = (phone || '51950831602').replace(/\D/g, '') || '51950831602';
  const fecha = tentativeDate && tentativeDate.trim() ? tentativeDate : '[Por definir]';
  const toursList = selectedTours.length > 0 ? selectedTours.join(', ') : (destination || 'Aventura en Piura');
  const codigo = promoCode && promoCode.trim() ? promoCode.toUpperCase() : 'Ninguno';
  const totalTexto = total !== null ? `S/. ${total.toFixed(2)} PEN` : 'Solicitar cotización personalizada';

  const text = `Hola, VELORA. He preparado una cotización en su calculadora web para el norte de Perú:\n\n` +
    `📍 *Rutas / Destino:* ${toursList}\n` +
    `📅 *Fecha tentativa:* ${fecha}\n` +
    `👥 *Viajeros:* ${adults} adulto(s)${children > 0 ? ` y ${children} niño(s)` : ''}\n` +
    `🚙 *Modalidad:* ${serviceType === 'privado' ? 'Tour Privado Exclusivo' : 'Tour Compartido'}\n` +
    `🎟️ *Código promocional:* ${codigo}\n` +
    `💵 *Total estimado:* ${totalTexto} (Subtotal: S/. ${subtotal.toFixed(2)}, Descuento: S/. ${discount.toFixed(2)})\n\n` +
    `Por favor, confirmen disponibilidad de movilidad, itinerario detallado y precio final. Gracias.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralContactWhatsAppUrl(phone: string, subject?: string): string {
  const cleanPhone = (phone || '51950831602').replace(/\D/g, '') || '51950831602';
  const text = `Hola, VELORA. Quisiera consultar sobre las rutas y experiencias turísticas en Piura ${subject ? `(${subject})` : ''}. ¿Me podrían brindar asesoría personalizada?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
