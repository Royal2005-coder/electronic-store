'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, X } from 'lucide-react';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems, cartTotal, removeFromCart } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg z-50"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Giỏ hàng</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Giỏ hàng trống</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => {
                const itemTotal = item.discount
                  ? item.price * (1 - item.discount) * item.quantity
                  : item.price * item.quantity;

                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        SL: {item.quantity} x {formatPrice(
                          item.discount
                            ? item.price * (1 - item.discount)
                            : item.price
                        )}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {formatPrice(itemTotal)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Tổng tiền:</span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  className="block text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  onClick={onClose}
                >
                  Xem giỏ hàng
                </Link>
                <Link
                  href="/checkout"
                  className="block text-center py-2 px-4 bg-primary text-white hover:bg-primary/90 rounded-md transition-colors"
                  onClick={onClose}
                >
                  Thanh toán
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 