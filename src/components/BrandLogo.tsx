'use client';

import Image from 'next/image';

interface BrandLogoProps {
  brand: string;
  className?: string;
}

const brandLogos: { [key: string]: string } = {
  'Apple': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
  'Samsung': 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=80',
  'Dell': 'https://images.unsplash.com/photo-1593642634443-44adaa06623a?w=800&auto=format&fit=crop&q=80',
  'Asus': 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&auto=format&fit=crop&q=80',
  'Sony': 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=80',
  'Google': 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format&fit=crop&q=80',
  'Microsoft': 'https://images.unsplash.com/photo-1642132652075-2b0c0ff38202?w=800&auto=format&fit=crop&q=80',
  'Lenovo': 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=800&auto=format&fit=crop&q=80',
  'HP': 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&auto=format&fit=crop&q=80',
  'Acer': 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=800&auto=format&fit=crop&q=80',
  'MSI': 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800&auto=format&fit=crop&q=80',
  'LG': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80'
};

export default function BrandLogo({ brand, className = '' }: BrandLogoProps) {
  const logoUrl = brandLogos[brand] || '';

  if (!logoUrl) return null;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src={logoUrl}
        alt={`${brand} logo`}
        width={120}
        height={60}
        className="object-cover w-full h-full rounded-lg"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
        <span className="text-white font-semibold text-lg">{brand}</span>
      </div>
    </div>
  );
} 