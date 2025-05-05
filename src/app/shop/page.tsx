'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiShoppingCart, 
  FiSearch, 
  FiChevronDown, 
  FiStar, 
  FiHeart, 
  FiEye,
  FiTag,
  FiBox,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiHeadphones,
  FiCheck,
  FiX,
  FiSliders,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiPercent,
  FiPackage,
  FiAlertCircle,
  FiInbox
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { products as dataProducts } from '@/data/products';
import { Product } from '@/types/types';
import { categories } from '@/data/products';
import { formatPrice } from '@/lib/utils';

// Interface to match CartContext's expected type
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const brands = [
  { 
    id: 'all', 
    name: 'Tất cả', 
    logo: '/images/brands/all.svg',
    bgColor: 'bg-gradient-to-r from-blue-500 to-purple-500'
  },
  { 
    id: 'apple', 
    name: 'Apple', 
    logo: '/images/brands/apple.svg',
    bgColor: 'bg-black'
  },
  { 
    id: 'samsung', 
    name: 'Samsung', 
    logo: '/images/brands/samsung.svg',
    bgColor: 'bg-[#1428A0]'
  },
  { 
    id: 'dell', 
    name: 'Dell', 
    logo: 'https://cdn.worldvectorlogo.com/logos/dell-technologies-2.svg',
    bgColor: 'bg-[#007DB8]'
  },
  { 
    id: 'asus', 
    name: 'Asus', 
    logo: 'https://cdn.worldvectorlogo.com/logos/asus-2.svg',
    bgColor: 'bg-[#00539B]'
  },
  { 
    id: 'lenovo', 
    name: 'Lenovo', 
    logo: 'https://cdn.worldvectorlogo.com/logos/lenovo-2020-1.svg',
    bgColor: 'bg-[#E2231A]'
  },
  { 
    id: 'google', 
    name: 'Google', 
    logo: 'https://cdn.worldvectorlogo.com/logos/google-1-1.svg',
    bgColor: 'bg-white'
  },
  { 
    id: 'oneplus', 
    name: 'OnePlus', 
    logo: 'https://cdn.worldvectorlogo.com/logos/oneplus-8.svg',
    bgColor: 'bg-[#EB0028]'
  },
  { 
    id: 'xiaomi', 
    name: 'Xiaomi', 
    logo: 'https://cdn.worldvectorlogo.com/logos/xiaomi-1.svg',
    bgColor: 'bg-[#FF6900]'
  }
];

const sortOptions = [
  { value: 'price-asc', label: 'Giá: Thấp đến cao', icon: FiChevronDown },
  { value: 'price-desc', label: 'Giá: Cao đến thấp', icon: FiChevronDown },
  { value: 'name-asc', label: 'Tên: A-Z', icon: FiChevronDown },
  { value: 'name-desc', label: 'Tên: Z-A', icon: FiChevronDown },
  { value: 'popular', label: 'Phổ biến nhất', icon: FiStar },
  { value: 'newest', label: 'Mới nhất', icon: FiClock },
  { value: 'rating', label: 'Đánh giá cao nhất', icon: FiTrendingUp },
];

const featuredCategories = [
  {
    name: 'Điện thoại',
    icon: <FiSmartphone className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Laptop',
    icon: <FiMonitor className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Máy tính bảng',
    icon: <FiTablet className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Phụ kiện',
    icon: <FiHeadphones className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  }
];

// Use imported products instead of local ones
const allProducts = dataProducts;

const hasDiscount = (product: Product): boolean => {
  return typeof product.discount === 'number' && product.discount > 0;
};

const getDiscountedPrice = (price: number, discount?: number) => {
  if (!discount) return price;
  return price * (1 - discount / 100);
};

// Thêm components cho loading và error states
const LoadingSkeleton = () => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <FiAlertCircle className="text-red-500 text-4xl mb-4" />
    <p className="text-gray-600 dark:text-gray-400">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Thử lại
    </button>
  </div>
);

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

// Helper functions for discount calculation
const normalizeDiscount = (discount: number | undefined): number => {
  if (!discount) return 0;
  return discount > 1 ? discount / 100 : discount;
};

const calculateDiscountedPrice = (price: number, discount: number | undefined): number => {
  const normalizedDiscount = normalizeDiscount(discount);
  return price * (1 - normalizedDiscount);
};

const formatDiscountPercentage = (discount: number | undefined): string => {
  if (!discount) return '0%';
  return `${discount > 1 ? discount : discount * 100}%`;
};

const ProductCard = ({ product, viewMode, isFavorite, onToggleFavorite }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Ensure all required product fields are present
      const cartProduct: Product = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        specs: product.specs || {},
        discount: product.discount || 0,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        colors: product.colors || [],
        images: product.images || [product.image]
      };
      
      console.log('Adding product to cart:', cartProduct);
      addToCart(cartProduct, 1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Không thể thêm sản phẩm vào giỏ hàng");
    }
  };

  const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className={`group relative overflow-hidden rounded-lg border p-3 hover:border-primary ${
          viewMode === 'list' ? 'flex gap-6' : ''
        }`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
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
          {hasDiscount && (
            <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              -{formatDiscountPercentage(discount)}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
          <h3 className="text-lg font-medium hover:text-primary">{product.name}</h3>
          
          <div className="mt-2">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(product.price)}
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
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Thêm vào giỏ
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className="ml-2 rounded-full p-2 hover:bg-gray-100"
            >
              <FiHeart 
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function ShopPage() {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 70000000]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sử dụng dữ liệu sản phẩm trực tiếp từ file products.ts
  const products = allProducts;
  
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Tối ưu filteredProducts với useMemo
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = !searchQuery || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
        const matchesBrand = selectedBrand === 'Tất cả' || product.brand === selectedBrand;
        const matchesPrice = (!priceRange[0] || getDiscountedPrice(product.price, product.discount) >= priceRange[0]) && 
          (!priceRange[1] || getDiscountedPrice(product.price, product.discount) <= priceRange[1]);

        const matchesTab = 
          (activeTab === 'new' && product.isNew) ||
          (activeTab === 'featured' && product.isFeatured) ||
          (activeTab === 'sale' && product.discount) ||
          activeTab === 'all';

        const matchesDiscount = !showDiscounted || product.discount;

        return matchesSearch && matchesCategory && matchesBrand && 
          matchesPrice && matchesTab && matchesDiscount;
      })
      .sort((a, b) => {
        const discountedPriceA = getDiscountedPrice(a.price, a.discount);
        const discountedPriceB = getDiscountedPrice(b.price, b.discount);

        switch (sortBy) {
          case 'price-asc':
            return discountedPriceA - discountedPriceB;
          case 'price-desc':
            return discountedPriceB - discountedPriceA;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'popular':
            return b.reviews - a.reviews;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, activeTab, showDiscounted, sortBy, products]);

  // Tối ưu formatPrice với useMemo
  const formatPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    
    return (price: number) => formatter.format(price);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Reset các bộ lọc khác khi chọn danh mục mới
    if (categoryName !== selectedCategory) {
      setActiveTab('all');
      setShowDiscounted(false);
    }
    setShowFilters(false);
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    // Reset các bộ lọc khác khi chọn thương hiệu mới
    if (brandName !== selectedBrand) {
      setActiveTab('all');
      setShowDiscounted(false);
    }
    setShowFilters(false);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
      <div className="container mx-auto px-4 py-8">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Cửa hàng</h1>
        
        <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
            <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
          >
            <FiList size={20} />
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-md bg-gray-100 md:hidden"
          >
            <FiFilter size={20} />
              </button>
            </div>
          </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {['Tất cả', ...categories].map((category) => (
                      <button 
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                      >
              {category}
                      </button>
          ))}
                    </div>
                  </div>

      {/* Product Grid */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FiInbox className="text-gray-400 text-5xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500 max-w-md mb-6">Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
            <button
                      onClick={() => {
                setSelectedCategory('Tất cả');
                setSelectedBrand('Tất cả');
                setSearchQuery('');
                setPriceRange([0, 70000000]);
                setActiveTab('all');
                setShowDiscounted(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
                  </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                viewMode={viewMode}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
