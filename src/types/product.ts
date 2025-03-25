
export interface RatingEntry {
  username: string;
  gmail: string;
  rating: number;
  _id?: string;
}

export interface ProductSize {
  size: string;
  price: number;
  _id?: string;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: ProductSize[];
  images: string[];
  category: 'men' | 'women' | 'unisex';
  featured: boolean;
  new: boolean;
  ratings?: RatingEntry[];
  avgRating: number;
  numRatings: number;
  __v?: number;
}
