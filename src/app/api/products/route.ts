import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  let filteredProducts = [...products];
  
  // Apply filters if they exist
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const isNew = searchParams.get('isNew');
  const isFeatured = searchParams.get('isFeatured');
  const hasDiscount = searchParams.get('hasDiscount');
  
  if (category && category !== 'Tất cả') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (brand && brand !== 'Tất cả') {
    filteredProducts = filteredProducts.filter(p => p.brand === brand);
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }
  
  if (isNew === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isNew);
  }
  
  if (isFeatured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isFeatured);
  }
  
  if (hasDiscount === 'true') {
    filteredProducts = filteredProducts.filter(p => p.discount && p.discount > 0);
  }
  
  return NextResponse.json(filteredProducts);
} 