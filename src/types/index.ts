export type TourCategory = 'playas' | 'naturaleza' | 'cultura' | 'gastronomia' | 'especiales';

export interface Tour {
  id: number;
  slug: string;
  name: string;
  category: TourCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  basePrice: number | null; // S/. null indicates "Solicitar cotización"
  promoPrice?: number | null;
  badge?: string;
  image: string;
  location: string;
  activities: string[];
  included: string[];
  notIncluded: string[];
  recommendations: string[];
  longDistanceNotice?: boolean;
  conditions: string;
}

export interface Promotion {
  id: string;
  title: string;
  discountPercentage?: number;
  fixedDiscount?: number;
  tag: string;
  description: string;
  code: string;
  applicableCategories?: TourCategory[];
  minTravelers?: number;
  conditions: string;
  expirationDate: string;
  active: boolean;
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  distanceFromPiura: string;
  tags: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'reservas' | 'pagos' | 'transporte' | 'clima' | 'politicas' | 'cancelaciones' | 'recomendaciones';
}
