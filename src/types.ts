export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  dietaryType: 'veg' | 'non-veg';
  country: string;
  region?: string;
  countryFlag?: string;
  highlight?: string;
  dietary?: string[];
  pairing?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  source: string;
  rating?: number;
}

export interface ReservationFormData {
  date: string;
  time: string;
  partySize: string;
  name: string;
  countryCode?: string;
  phone: string;
  email: string;
  dietaryPreference?: 'all' | 'veg' | 'non-veg';
  specialRequests?: string;
  seatingPreference?: 'main_dining' | 'chefs_counter' | 'bar_lounge' | 'outdoor_patio';
  sendToWhatsapp?: boolean;
  whatsappPhone?: string;
}

export interface BollywoodTrack {
  id: string;
  title: string;
  movie: string;
  singers: string;
  year: string;
  durationSeconds: number;
  durationFormatted: string;
  audioUrl: string;
  imageUrl: string;
  label?: string;
  category?: string;
  vibeQuote?: string;
}

