'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { FiGrid, FiList } from 'react-icons/fi';
import { useState } from 'react';
import { theme } from '@/styles/theme';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const categories = [
  'All Products',
  'Laptops',
  'Smartphones',
  'Accessories',
  'Gadgets'
];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <section className="relative py-20" style={{ background: theme.colors.background.primary }}>
      {/* Background Effects */}
      <div className="absolute inset-0" style={{ 
        background: `radial-gradient(circle at 20% 20%, ${theme.colors.accent.purple.main}15, transparent 70%)`
      }} />
      <div className="absolute inset-0" style={{ 
        background: `radial-gradient(circle at 80% 80%, ${theme.colors.accent.blue.main}15, transparent 70%)`
      }} />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6" style={{
            background: theme.colors.gradients.secondary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Featured Products
          </h2>
          <p style={{ color: theme.colors.text.secondary }} className="max-w-2xl mx-auto text-lg">
            Discover our curated selection of premium tech products, designed to enhance your digital lifestyle
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium
                  transition-all duration-300 transform
                `}
                style={{
                  background: activeCategory === category 
                    ? theme.colors.gradients.primary 
                    : theme.colors.glass.background,
                  color: activeCategory === category 
                    ? theme.colors.text.primary 
                    : theme.colors.text.secondary,
                  boxShadow: activeCategory === category 
                    ? theme.shadows.glow.primary 
                    : 'none',
                  transform: activeCategory === category 
                    ? 'scale(1.05)' 
                    : 'scale(1)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="p-2 rounded-lg transition-all duration-300"
                style={{
                  background: viewMode === mode 
                    ? theme.colors.gradients.primary 
                    : theme.colors.glass.background,
                  color: viewMode === mode 
                    ? theme.colors.text.primary 
                    : theme.colors.text.secondary
                }}
              >
                {mode === 'grid' ? <FiGrid size={20} /> : <FiList size={20} />}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`
            grid gap-8 stagger-children
            ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
            }
          `}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={`
                relative group hover-lift
                ${viewMode === 'list' ? 'w-full' : ''}
              `}
            >
              <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                style={{ background: theme.colors.gradients.primary }} />
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="
            relative px-8 py-3 rounded-full text-white font-medium group
            transform transition-all duration-300
            hover:scale-105 active:scale-95
          " style={{
            background: theme.colors.gradients.primary,
            boxShadow: theme.shadows.glow.primary
          }}>
            <span className="relative z-10">Load More Products</span>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: theme.colors.gradients.secondary }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 