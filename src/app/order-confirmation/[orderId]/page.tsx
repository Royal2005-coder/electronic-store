'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FiCheckCircle, FiLoader, FiAlertCircle, FiArrowLeft, FiMapPin, FiUser, FiMail, FiPhone, FiCalendar, FiHash, FiCreditCard } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CartItem } from '@/contexts/CartContext';

interface OrderDetails {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface InfoItemProps {
    icon?: IconType;
    label: string;
    value: React.ReactNode; // Allow React nodes for value (like status chip)
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/orders?orderId=${orderId}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error fetching order: ${response.statusText}`);
          }
          const data = await response.json();
          setOrder(data);
        } catch (err: any) {
          console.error("Failed to fetch order:", err);
          setError(err.message || 'Không thể tải thông tin đơn hàng.');
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    } else {
        setError('Mã đơn hàng không hợp lệ.');
        setLoading(false);
        // Redirect immediately if orderId is missing
        router.replace('/');
    }
  }, [orderId, router]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch (e) {
        console.error("Error formatting date:", e);
        return 'Invalid Date';
    }
  };

  const getStatusChip = (status: string) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
        case 'pending': return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Đang chờ xử lý</span>;
        case 'processing': return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Đang xử lý</span>;
        case 'shipped': return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Đã giao hàng</span>;
        case 'delivered': return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Đã nhận</span>;
        case 'cancelled': return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Đã hủy</span>;
        default: return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><FiLoader className="animate-spin text-blue-600" size={40}/></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <FiAlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Lỗi</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <FiArrowLeft size={18} />
          Về trang chủ
        </Link>
      </div>
    );
  }

  if (!order) {
    return <div className="flex justify-center items-center h-screen"><p>Không tìm thấy thông tin đơn hàng.</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <FiCheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-600 dark:text-gray-400">Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Mã đơn hàng: <span className="font-medium text-gray-700 dark:text-gray-300">{order.orderId}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-b border-gray-200 dark:border-gray-700 py-8">
          {/* Shipping Details */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 border-b pb-2">Thông tin giao hàng</h2>
            <InfoItem icon={FiUser} label="Người nhận" value={order.customer.name} />
            <InfoItem icon={FiMail} label="Email" value={order.customer.email} />
            <InfoItem icon={FiPhone} label="Điện thoại" value={order.customer.phone} />
            <InfoItem icon={FiMapPin} label="Địa chỉ" value={`${order.customer.address}, ${order.customer.city}, ${order.customer.zipCode}, ${order.customer.country}`} />
          </div>

          {/* Order Summary */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 border-b pb-2">Chi tiết đơn hàng</h2>
            <InfoItem icon={FiHash} label="Mã đơn hàng" value={order.orderId} />
            <InfoItem icon={FiCalendar} label="Ngày đặt" value={formatDate(order.createdAt)} />
            <InfoItem icon={FiCreditCard} label="Thanh toán" value={order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Thanh toán bằng thẻ'} />
            <InfoItem icon={FiCheckCircle} label="Trạng thái" value={getStatusChip(order.status)} />
          </div>
        </div>

        {/* Items Ordered */}
        <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sản phẩm đã đặt</h2>
            <div className="space-y-4">
                {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                    />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Order Total */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-right">
            <div className="mb-1">
                <span className="text-gray-600 dark:text-gray-300">Tạm tính: </span>
                <span className="font-semibold text-gray-800 dark:text-white">{formatPrice(order.total)}</span>
            </div>
             <div className="mb-2">
                <span className="text-gray-600 dark:text-gray-300">Phí vận chuyển: </span>
                <span className="font-semibold text-gray-800 dark:text-white">Miễn phí</span>
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">
                <span>Tổng cộng: </span>
                <span>{formatPrice(order.total)}</span>
            </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FiArrowLeft size={18} />
            Quay về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// Helper component for displaying info items
const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }: InfoItemProps) => (
  <div className="flex items-start">
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-28 flex-shrink-0 inline-flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400"/>}
        {label}:
    </span>
    <span className="text-sm text-gray-800 dark:text-gray-200">{value}</span>
  </div>
);
 