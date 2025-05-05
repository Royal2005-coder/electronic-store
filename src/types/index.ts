export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  description: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  specs?: {
    [key: string]: string | string[];
  };
  colors?: string[];
} 