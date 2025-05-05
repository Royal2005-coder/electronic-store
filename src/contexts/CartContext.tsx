'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Product } from '@/types/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'techstore_cart';

// Helper function to normalize discount value
const normalizeDiscount = (discount: number | undefined): number => {
  if (!discount) return 0;
  // If discount is greater than 1, assume it's a percentage (e.g., 10 means 10%)
  return discount > 1 ? discount / 100 : discount;
};

// Helper function to calculate discounted price
const calculateDiscountedPrice = (price: number, discount: number | undefined): number => {
  const normalizedDiscount = normalizeDiscount(discount);
  return price * (1 - normalizedDiscount);
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('Cart items saved:', cartItems);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...prevItems, { ...product, quantity }];
      });

      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    try {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Không thể cập nhật số lượng sản phẩm');
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    try {
      setCartItems([]);
      toast.success('Đã xóa giỏ hàng');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Không thể xóa giỏ hàng');
    }
  }, []);

  const total = cartItems.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 