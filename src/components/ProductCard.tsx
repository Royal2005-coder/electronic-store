'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Product } from '@/types/types';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      addToCart(product, 1);
      toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Không thể thêm sản phẩm vào giỏ hàng");
    }
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount) 
    : product.price;

  return (
    <Link href={`/product/${product.id}`}>
      <div className={`group relative overflow-hidden rounded-lg border p-3 hover:border-primary ${
        viewMode === 'list' ? 'flex gap-6' : ''
      }`}>
        {/* Product Image */}
        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'} overflow-hidden rounded-lg`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs text-white">
              Mới
            </span>
          )}
          {product.discount && (
            <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              -{product.discount * 100}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
          <h3 className="text-lg font-medium hover:text-primary">{product.name}</h3>
          
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          {viewMode === 'list' && (
            <p className="mt-2 text-gray-600">{product.description}</p>
          )}

          <div className={`mt-4 flex items-center ${viewMode === 'list' ? 'justify-start gap-4' : 'justify-between'}`}>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Thêm vào giỏ</span>
            </button>
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(product.id);
                }}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Heart 
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}