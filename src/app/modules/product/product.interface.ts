import { Types } from 'mongoose';

type ITechnicalSpecs = {
  display: string;
  battery: string;
  sensors: string[];
  connectivity: string;
  dimensions: string;
  weight: string;
  materials: string;
};

type IProduct = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  category: Types.ObjectId;
  inStock: boolean;
  stockCount: number;
  badge?: string; // e.g. 'Bestseller', 'Customer Favorite'
  rating?: number;
  reviewCount?: number;
  image: string[];
  features: string[];
  technicalSpecs: ITechnicalSpecs;
  inTheBox: string[];
};
