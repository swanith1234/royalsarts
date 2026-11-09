// Core Types for Royal Art Marketplace

export interface Artist {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  style: string[];
  location: string;
  bio: string;
  philosophy: string;
  experience: string;
  rating: number;
  reviewCount: number;
  artworkCount: number;
  portrait: string;
  studioImage: string;
  featured: boolean;
  socialLinks?: {
    instagram?: string;
    website?: string;
  };
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  artistName: string;
  artistSlug: string;
  price: number;
  priceDisplay: string;
  medium: string;
  dimensions: string;
  category: string;
  year: number;
  description: string;
  story: string;
  images: string[];
  thumbnail: string;
  available: boolean;
  featured: boolean;
  newArrival: boolean;
  tags: string[];
  authenticity: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  role: string;
  verified: boolean;
  date: string;
}

export interface CartItem {
  artworkId: string;
  artwork: Artwork;
  addedAt: string;
}

export interface FilterState {
  search: string;
  category: string;
  style: string[];
  priceMin: number;
  priceMax: number;
  medium: string;
  availability: string;
  sortBy: string;
}

export interface ArtistFilterState {
  search: string;
  style: string;
  location: string;
  sortBy: string;
}

export type NavVariant = 'A' | 'B';
