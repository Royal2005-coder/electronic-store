'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiShoppingBag, FiHome } from 'react-icons/fi';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-8 flex items-center justify-center"
        >
          <FiCheck className="w-12 h-12 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã mua hàng tại TechStore. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
            Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
          </p>

          <div className="space-y-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FiShoppingBag className="mr-2" />
              Tiếp tục mua sắm
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiHome className="mr-2" />
              Về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 