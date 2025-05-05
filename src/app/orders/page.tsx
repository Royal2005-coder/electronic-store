'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FiShoppingBag,
  FiClock,
  FiTruck,
  FiCheck,
  FiX,
  FiLoader,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiArrowLeft
} from 'react-icons/fi';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: 'cod' | 'card';
  trackingNumber?: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      date: '2024-03-15',
      total: 34990000,
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'iPhone 14 Pro Max',
          quantity: 1,
          price: 34990000,
          image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800&auto=format&fit=crop&q=80'
        }
      ],
      shippingAddress: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        address: '123 Đường ABC',
        city: 'Hồ Chí Minh'
      },
      paymentMethod: 'cod'
    },
    {
      id: 'ORD002',
      date: '2024-03-14',
      total: 69990000,
      status: 'processing',
      items: [
        {
          id: '2',
          name: 'MacBook Pro 16"',
          quantity: 1,
          price: 69990000,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
        }
      ],
      shippingAddress: {
        name: 'Trần Thị B',
        phone: '0987654321',
        address: '456 Đường XYZ',
        city: 'Hà Nội'
      },
      paymentMethod: 'card',
      trackingNumber: 'TN123456789'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/orders');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FiClock />;
      case 'processing':
        return <FiLoader className="animate-spin" />;
      case 'shipped':
        return <FiTruck />;
      case 'delivered':
        return <FiCheck />;
      case 'cancelled':
        return <FiX />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    setIsLoading(true);
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled' as Order['status'] }
          : order
      )
    );
    
    setIsLoading(false);
    toast.success('Đã hủy đơn hàng thành công!');
  };

  const filteredOrders = orders
    .filter(order => filterStatus === 'all' || order.status === filterStatus)
    .filter(order =>
      searchQuery
        ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Đơn hàng của tôi</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đang giao</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <FiShoppingBag className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-300">Không tìm thấy đơn hàng nào</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          Đơn hàng #{order.id}
                        </h3>
                        {order.status === 'pending' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order.id);
                            }}
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
                          >
                            Hủy đơn
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          <span>{new Date(order.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        {order.trackingNumber && (
                          <div>
                            <span className="text-blue-600 dark:text-blue-400">
                              #{order.trackingNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </span>
                      {selectedOrder === order.id ? (
                        <FiChevronUp className="text-gray-400" size={20} />
                      ) : (
                        <FiChevronDown className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {selectedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                            Thông tin giao hàng
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p>Người nhận: {order.shippingAddress.name}</p>
                            <p>Số điện thoại: {order.shippingAddress.phone}</p>
                            <p>Địa chỉ: {order.shippingAddress.address}</p>
                            <p>Thành phố: {order.shippingAddress.city}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                            Phương thức thanh toán
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {order.paymentMethod === 'cod'
                              ? 'Thanh toán khi nhận hàng (COD)'
                              : 'Thanh toán bằng thẻ'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                          Sản phẩm
                        </h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                            >
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Số lượng: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 