'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Ra mắt iPhone 15 Pro Max với nhiều tính năng đột phá",
      excerpt: "Apple vừa chính thức ra mắt dòng iPhone 15 với nhiều cải tiến về camera và hiệu năng...",
      category: "Sản phẩm mới",
      date: "2024-03-15",
      image: "/images/news/iphone15.jpg",
      author: "Nguyễn Văn A"
    },
    {
      id: 2,
      title: "TechStore mở rộng chuỗi cửa hàng tại miền Trung",
      excerpt: "Chuỗi cửa hàng công nghệ TechStore tiếp tục mở rộng với 5 chi nhánh mới tại các tỉnh miền Trung...",
      category: "Tin công ty",
      date: "2024-03-10",
      image: "/images/news/store-opening.jpg",
      author: "Trần Thị B"
    },
    {
      id: 3,
      title: "Top 10 laptop gaming đáng mua nhất 2024",
      excerpt: "Tổng hợp những mẫu laptop gaming tốt nhất cho các game thủ trong năm 2024...",
      category: "Đánh giá",
      date: "2024-03-05",
      image: "/images/news/gaming-laptops.jpg",
      author: "Lê Văn C"
    },
    {
      id: 4,
      title: "Hướng dẫn chọn mua điện thoại phù hợp",
      excerpt: "Những tiêu chí quan trọng cần cân nhắc khi chọn mua điện thoại mới...",
      category: "Hướng dẫn",
      date: "2024-03-01",
      image: "/images/news/phone-guide.jpg",
      author: "Phạm Thị D"
    }
  ];

  const categories = ['all', 'Sản phẩm mới', 'Tin công ty', 'Đánh giá', 'Hướng dẫn'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Tin tức & Cập nhật
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Cập nhật tin tức mới nhất về công nghệ và TechStore
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Tất cả' : category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {new Date(article.date).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="flex items-center">
                    <FiTag className="mr-1" />
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Bởi {article.author}
                  </span>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200">
                    Đọc thêm
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 