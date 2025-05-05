'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { FiShoppingCart, FiX, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function CartIcon() {
  const { cartItems, total, removeFromCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Xử lý click outside để đóng preview
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setShowPreview(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hiệu ứng khi thêm vào giỏ hàng
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Xử lý xóa sản phẩm
  const handleRemoveItem = (productId: string) => {
    try {
      removeFromCart(productId);
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Không thể xóa sản phẩm');
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative">
        <button 
          className="flex items-center space-x-1"
          aria-label="Cart"
        >
          <div className="relative">
            <FiShoppingCart className="w-6 h-6" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={previewRef}>
      <button 
        className="flex items-center space-x-1"
        onClick={() => setShowPreview(!showPreview)}
        aria-label="Toggle cart preview"
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FiShoppingCart className="w-6 h-6" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {/* Cart Preview */}
      <AnimatePresence>
        {showPreview && cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl border z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Giỏ hàng ({itemCount} sản phẩm)</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close cart preview"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.discount ? item.price * (1 - item.discount) : item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="font-semibold text-primary">{formatPrice(total)}</span>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/cart"
                    onClick={() => setShowPreview(false)}
                    className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Xem giỏ hàng
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setShowPreview(false)}
                    className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-black/90 transition-colors"
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 