'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80',
    title: 'New MacBook Pro',
    description: 'Supercharged for pros with M2 Max chip',
    cta: 'Shop Now',
    link: '/product/7',
    badge: 'New Release'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1600&q=80',
    title: 'iPhone 15 Pro Max',
    description: 'The most powerful iPhone ever',
    cta: 'Discover More',
    link: '/product/2',
    badge: 'Best Seller'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80',
    title: 'Smart Watch',
    description: 'Track your fitness and stay connected',
    cta: 'Explore',
    link: '/product/3',
    badge: 'Trending'
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl mx-4 my-6 shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover rounded-2xl transform transition-transform duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent rounded-2xl" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className={`max-w-2xl transform transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isTransitioning ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'
              }`}>
                {slide.badge && (
                  <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    {slide.badge}
                  </span>
                )}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slide.description}
                </p>
                <Link
                  href={slide.link}
                  className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="font-medium">{slide.cta}</span>
                  <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 