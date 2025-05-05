import mongoose from 'mongoose';

// TypeScript interfaces
interface ProductImage {
  url: string;
  alt?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: ProductImage[];
  category: string;
  stock: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ProductImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  images: [ProductImageSchema],
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create or get model
const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;
export type { Product, ProductImage };
