import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
}

export function calculateDiscount(price: number, discountPercentage: number): number {
  return price - (price * (discountPercentage / 100));
}

export function getDiscountedPrice(price: number, discount?: number) {
  if (!discount) return price;
  return price * (1 - discount);
}

export function isNewProduct(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(createdAt) > thirtyDaysAgo;
} 