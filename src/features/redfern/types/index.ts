export type PageRoute = '/' | '/menu' | '/about' | '/reservations' | '/contact';

export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'steaks' | 'appetizers' | 'salads' | 'desserts';
  description: string;
  proposedPrice?: string;
  isPriceVerified: boolean;
  dietary?: string[];
  image: string;
  fallbackIcon?: string;
}

export interface HeroSlide {
  id: number;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: PageRoute;
  secondaryCtaText: string;
  secondaryCtaLink: PageRoute;
  image: string;
  imageAlt: string;
}

export interface ReservationRequest {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface ReservationRecord extends ReservationRequest {
  id: string;
  confirmationCode: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface ContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessageRecord extends ContactMessageRequest {
  id: string;
  createdAt: string;
  status: 'received';
}
