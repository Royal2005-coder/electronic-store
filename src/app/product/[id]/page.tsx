'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { 
  FiMinus, 
  FiPlus, 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiArrowLeft,
  FiStar,
  FiPackage,
  FiTruck,
  FiShield,
  FiClock,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { products } from '@/data/products';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addToCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      addToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  const productImages = product.images || Array(4).fill(product.image);
  const discountedPrice = product.discount ? product.price * (1 - product.discount) : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-blue-600">Cửa hàng</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index.toString()}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden",
                  selectedImage === index && "ring-2 ring-blue-600"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i.toString()}
                  className={cn(
                    "w-5 h-5",
                    i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews.toString()} đánh giá)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Số lượng:</label>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-3 py-2 border-x">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <FiShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleToggleFavorite}
              className={cn(
                "p-3 rounded-lg border",
                isFavorite ? "bg-red-50 border-red-200" : "hover:bg-gray-50"
              )}
            >
              <FiHeart
                className={cn(
                  "w-5 h-5",
                  isFavorite && "fill-red-500 text-red-500"
                )}
              />
            </button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Miễn phí vận chuyển</h3>
                <p className="text-sm text-gray-600">Cho đơn hàng từ 500k</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Giao hàng nhanh</h3>
                <p className="text-sm text-gray-600">Từ 2-4 ngày</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Bảo hành 12 tháng</h3>
                <p className="text-sm text-gray-600">Đổi trả miễn phí</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Hỗ trợ 24/7</h3>
                <p className="text-sm text-gray-600">Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}