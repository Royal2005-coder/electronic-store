'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTruck, FiHeadphones } from 'react-icons/fi';

const features = [
  {
    icon: <FiAward className="w-6 h-6" />,
    title: 'Chất lượng hàng đầu',
    description: 'Cam kết cung cấp các sản phẩm chính hãng với chất lượng tốt nhất.'
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: 'Đội ngũ chuyên nghiệp',
    description: 'Nhân viên được đào tạo chuyên sâu, tận tâm phục vụ khách hàng.'
  },
  {
    icon: <FiTruck className="w-6 h-6" />,
    title: 'Giao hàng nhanh chóng',
    description: 'Dịch vụ vận chuyển nhanh chóng, đảm bảo an toàn cho sản phẩm.'
  },
  {
    icon: <FiHeadphones className="w-6 h-6" />,
    title: 'Hỗ trợ 24/7',
    description: 'Luôn sẵn sàng hỗ trợ khách hàng mọi lúc mọi nơi.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="TechStore Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Về TechStore</h1>
            <p className="text-xl md:text-2xl">Đối tác tin cậy trong lĩnh vực công nghệ</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Câu chuyện của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="prose dark:prose-invert max-w-none">
              <p>
                TechStore được thành lập vào năm 2020 với sứ mệnh mang đến những sản phẩm công nghệ 
                chất lượng cao đến tay người tiêu dùng Việt Nam. Chúng tôi không chỉ đơn thuần là 
                một cửa hàng điện tử, mà còn là người đồng hành đáng tin cậy trong hành trình khám 
                phá và trải nghiệm công nghệ của khách hàng.
              </p>
              <p>
                Với đội ngũ nhân viên giàu kinh nghiệm và đam mê công nghệ, chúng tôi luôn nỗ lực 
                cập nhật những xu hướng mới nhất và mang đến những sản phẩm tốt nhất cho khách hàng.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/images/store-interior.jpg"
                alt="TechStore Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Điểm khác biệt của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-blue-600 text-white rounded-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Khách hàng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Sản phẩm</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Đối tác</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Hỗ trợ</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 