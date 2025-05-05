'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck, FiRefreshCw, FiShield, FiCreditCard, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BrandGrid from '@/components/BrandGrid';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2000&q=80",
      tag: "Mới ra mắt",
      title: "MacBook Pro M2",
      description: "Siêu mạnh mẽ cho công việc chuyên nghiệp với chip M2 Max",
      gradient: "from-purple-900 to-blue-900"
    },
    {
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=2000&q=80",
      tag: "Bán chạy",
      title: "iPhone 15 Pro Max",
      description: "Camera chuyên nghiệp 48MP, chip A17 Pro mạnh mẽ",
      gradient: "from-blue-900 to-indigo-900"
    },
    {
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=2000&q=80",
      tag: "Khuyến mãi",
      title: "iPad Pro M2",
      description: "Sáng tạo không giới hạn với Apple Pencil thế hệ mới",
      gradient: "from-indigo-900 to-violet-900"
    },
    {
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=2000&q=80",
      tag: "Sắp ra mắt",
      title: "MacBook Air 15\"",
      description: "Mỏng nhẹ đột phá, pin 18 giờ, màn hình Liquid Retina",
      gradient: "from-violet-900 to-purple-900"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying]);

  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Miễn phí vận chuyển",
      description: "Cho đơn hàng trên 1 triệu",
      buttonText: "Mua sắm ngay",
      bgColor: "bg-blue-500",
      link: "/shop"
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Đổi trả dễ dàng",
      description: "Chính sách 30 ngày",
      buttonText: "Xem chính sách",
      bgColor: "bg-green-500",
      link: "/about"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Thanh toán an toàn",
      description: "Bảo mật 100%",
      buttonText: "Mua sắm an toàn",
      bgColor: "bg-purple-500",
      link: "/shop"
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Thanh toán linh hoạt",
      description: "Nhiều phương thức",
      buttonText: "Xem chi tiết",
      bgColor: "bg-orange-500",
      link: "/about"
    }
  ];

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      tag: "Mới ra mắt",
      title: "MacBook Pro M2",
      description: "Siêu mạnh mẽ cho công việc chuyên nghiệp",
      buttonText: "Mua ngay",
      link: "/shop"
    },
    {
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=80",
      tag: "Bán chạy",
      title: "iPhone 15 Pro",
      description: "Camera chuyên nghiệp, hiệu năng đỉnh cao",
      buttonText: "Khám phá ngay",
      link: "/shop"
    },
    {
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80",
      tag: "Giảm giá",
      title: "iPad Air",
      description: "Mỏng nhẹ, mạnh mẽ, đa năng",
      buttonText: "Xem thêm",
      link: "/shop"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] mx-4 my-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} rounded-3xl overflow-hidden shadow-2xl`}
          >
            <motion.div 
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0">
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover opacity-60 transform scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
              />
            </div>
            <div className="relative container mx-auto px-8 h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white max-w-2xl backdrop-blur-sm bg-black/10 p-8 rounded-2xl"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-block bg-blue-600/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg"
                >
                  {heroSlides[currentSlide].tag}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl mb-8 text-shadow"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/shop"
                    className="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Mua ngay
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="bg-black/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/40 transition-all duration-300 shadow-lg"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-black/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/40 transition-all duration-300 shadow-lg"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute -bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-lg ${
                  currentSlide === index 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-white/70 hover:bg-white'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${feature.bgColor} rounded-2xl p-6 text-white`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="mb-4 opacity-90">
                  {feature.description}
                </p>
                <Link
                  href={feature.link}
                  className="inline-block bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  {feature.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những sản phẩm công nghệ mới nhất và hot nhất tại TechStore
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {slide.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
            Thương hiệu nổi bật
          </h2>
          <BrandGrid />
        </div>
      </section>
    </div>
  );
}
