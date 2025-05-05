'use client';

import BrandLogo from './BrandLogo';
import { motion } from 'framer-motion';
import Link from 'next/link';

const brands = [
  'Apple',
  'Samsung',
  'Dell',
  'Asus',
  'Sony',
  'Google',
  'Microsoft',
  'Lenovo',
  'HP',
  'Acer',
  'MSI',
  'LG'
];

export default function BrandGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {brands.map((brand, index) => (
        <Link href={`/shop?brand=${brand.toLowerCase()}`} key={brand}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md p-4 flex items-center justify-center h-24 transition-all duration-300"
          >
            <BrandLogo brand={brand} className="w-full h-full" />
          </motion.div>
        </Link>
      ))}
    </div>
  );
} 