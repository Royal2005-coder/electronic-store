'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Order } from '@/types/types';
import Link from 'next/link';

interface OrderConfirmationProps {
  order: Order;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-600">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Mã đơn hàng:</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Ngày đặt hàng:</span>
            <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Tổng tiền:</span>
            <span className="font-medium">{order.total.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
} 