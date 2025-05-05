'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/format';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setLoading(true);
    try {
      await addToCart(product._id, 1);
      // Show success message
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </button>
      </div>
    </Link>
  );
} 