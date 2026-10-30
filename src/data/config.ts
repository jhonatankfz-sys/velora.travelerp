export interface VeloraConfig {
  brandName: string;
  tagline: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  location: string;
  department: string;
  country: string;
  whatsappNumber: string; // international digits without symbols for wa.me link
  whatsappDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  contactEmail: string;
  operatingHours: string;
  legalDisclaimer: string;
  pricingDisclaimer: string;
  demoNotice: string;
}

export const initialConfig: VeloraConfig = {
  brandName: "VELORA",
  tagline: "RUTAS Y EXPERIENCIAS",
  slogan: "Tu próxima aventura comienza aquí.",
  heroTitle: "Descubre el norte del Perú como nunca antes.",
  heroSubtitle: "Playas increíbles, aventuras inolvidables y experiencias únicas diseñadas para ti en Piura y la costa norte.",
  location: "Piura, Perú",
  department: "Piura",
  country: "Perú",
  whatsappNumber: "51973000000", // Editable in Admin
  whatsappDisplay: "+51 973 000 000",
  instagramUrl: "https://www.instagram.com/velora_rutas/",
  instagramHandle: "@velora_rutas",
  contactEmail: "contacto@velora.pe",
  operatingHours: "Lunes a Sábado: 8:00 AM - 7:00 PM | Domingos: 9:00 AM - 2:00 PM",
  legalDisclaimer: "VELORA — Rutas y Experiencias. Las solicitudes enviadas no constituyen una reserva confirmada hasta la validación y confirmación oficial por nuestro equipo.",
  pricingDisclaimer: "Tarifas referenciales expresadas en soles peruanos (S/.). Los precios finales varían según temporada, número de viajeros y servicios contratados.",
  demoNotice: "Plataforma oficial de muestra interactiva. Tarifas y promociones sujetas a confirmación directa con VELORA."
};

export const getStoredConfig = (): VeloraConfig => {
  if (typeof window === 'undefined') return initialConfig;
  try {
    const saved = localStorage.getItem('velora_site_config');
    if (saved) {
      return { ...initialConfig, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading config from localStorage', e);
  }
  return initialConfig;
};

export const saveConfig = (newConfig: VeloraConfig): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('velora_site_config', JSON.stringify(newConfig));
  }
};
