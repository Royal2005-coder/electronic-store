'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiShoppingBag, FiInfo, FiPhone, FiX, FiLogOut } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ 
        redirect: false,
        callbackUrl: '/auth/signin'
      });
      
      toast.success('Đăng xuất thành công');
      router.push('/auth/signin');
    } catch (error) {
      console.error('Signout error:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link 
          href="/shop" 
          className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
          onClick={onClose}
        >
          <FiShoppingBag className="w-5 h-5" />
          <span>Cửa hàng</span>
        </Link>
        <Link 
          href="/about" 
          className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
          onClick={onClose}
        >
          <FiInfo className="w-5 h-5" />
          <span>Giới thiệu</span>
        </Link>
        <Link 
          href="/contact" 
          className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
          onClick={onClose}
        >
          <FiPhone className="w-5 h-5" />
          <span>Liên hệ</span>
        </Link>
        {session ? (
          <>
            <Link 
              href="/account" 
              className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
              onClick={onClose}
            >
              <FiUser className="w-5 h-5" />
              <span>Tài khoản</span>
            </Link>
            <Link 
              href="/orders" 
              className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
              onClick={onClose}
            >
              <FiShoppingBag className="w-5 h-5" />
              <span>Đơn hàng</span>
            </Link>
            <div className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="mr-2">Đang đăng xuất...</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                  </>
                ) : (
                  <>
                    <FiLogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <Link 
            href="/auth/signin" 
            className="flex items-center gap-2 p-3 text-lg hover:bg-gray-100 rounded-md"
            onClick={onClose}
          >
            <FiUser className="w-5 h-5" />
            <span>Đăng nhập</span>
          </Link>
        )}
      </nav>
    </div>
  );
} 