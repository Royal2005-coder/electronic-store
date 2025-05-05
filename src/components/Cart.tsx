'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Giỏ hàng</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
              <p className="text-gray-500">Giỏ hàng trống</p>
              <Link
                href="/shop"
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                onClick={onClose}
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b py-4"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded-md border px-2 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded-md border px-2 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {formatPrice(
                          item.discount
                            ? item.price * (1 - item.discount) * item.quantity
                            : item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t px-4 py-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-base font-medium">Tổng tiền:</span>
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-2 block rounded-md bg-primary px-4 py-2 text-center text-white hover:bg-primary/90"
                  onClick={onClose}
                >
                  Thanh toán
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 