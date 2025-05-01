export interface Restaurant {
  id: number;
  name: string;
  establishedYear: number;
  image: string;
  rating: number;
  description: string;
  reviews: Review[];
  cuisine: string;
  priceRange: string;
  address: string;
  openingHours: string;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  visitDate: string;
}

export interface Cuisine {
  id: string;
  name: string;
}