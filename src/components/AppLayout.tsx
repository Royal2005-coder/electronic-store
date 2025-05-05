'use client';

import { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import CartIcon from '@/components/CartIcon';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { 
  FiUser, 
  FiMenu, 
  FiX, 
  FiShoppingBag, 
  FiPhone, 
  FiInfo, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiFacebook, 
  FiInstagram, 
  FiYoutube 
} from 'react-icons/fi';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="bg-primary text-white py-2 text-sm hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <FiPhone className="mr-2" />
                  <a href="tel:1900123456" className="hover:underline">1900 123 456</a>
                </span>
                <span className="flex items-center">
                  <FiMail className="mr-2" />
                  <a href="mailto:support@techstore.vn" className="hover:underline">support@techstore.vn</a>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <FiMapPin className="mr-2" />
                  Chi nhánh toàn quốc
                </span>
                <span className="flex items-center">
                  <FiClock className="mr-2" />
                  08:00 - 21:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-primary">
                TechStore
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/shop" className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <FiShoppingBag />
                  <span>Cửa hàng</span>
                </Link>
                <Link href="/about" className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <FiInfo />
                  <span>Giới thiệu</span>
                </Link>
                <Link href="/contact" className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <FiPhone />
                  <span>Liên hệ</span>
                </Link>
              </nav>

              {/* User Actions */}
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <FiUser className="w-6 h-6" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                      <Link href="/account" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <FiUser className="w-5 h-5 mr-2" />
                        Thông tin cá nhân
                      </Link>
                      <Link href="/orders" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <FiShoppingBag className="w-5 h-5 mr-2" />
                        Đơn hàng
                      </Link>
                      <hr className="my-2" />
                      <Link href="/login" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <FiUser className="w-5 h-5 mr-2" />
                        Đăng nhập
                      </Link>
                      <Link href="/register" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <FiUser className="w-5 h-5 mr-2" />
                        Đăng ký
                      </Link>
                    </div>
                  </div>
                </div>
                <CartIcon />
                
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <FiX className="w-6 h-6" />
                  ) : (
                    <FiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="container mx-auto px-4 py-4 space-y-4">
                <Link
                  href="/shop"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingBag />
                  <span>Cửa hàng</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiInfo />
                  <span>Giới thiệu</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiPhone />
                  <span>Liên hệ</span>
                </Link>
                <Link
                  href="/account"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser />
                  <span>Tài khoản</span>
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 pt-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Về TechStore</h3>
                <p className="text-sm leading-relaxed mb-4">
                  TechStore - Hệ thống bán lẻ thiết bị công nghệ hàng đầu Việt Nam với hơn 100 chi nhánh trên toàn quốc.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-primary transition-colors">
                    <FiFacebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <FiInstagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <FiYoutube className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Liên kết nhanh</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/shop" className="hover:text-primary transition-colors">
                      Sản phẩm mới
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-primary transition-colors">
                      Về chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-primary transition-colors">
                      Blog công nghệ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Hỗ trợ</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/shipping" className="hover:text-primary transition-colors">
                      Chính sách vận chuyển
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="hover:text-primary transition-colors">
                      Chính sách đổi trả
                    </Link>
                  </li>
                  <li>
                    <Link href="/warranty" className="hover:text-primary transition-colors">
                      Chính sách bảo hành
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Liên hệ</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <FiMapPin className="w-5 h-5 mt-0.5" />
                    <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5" />
                    <span>1900 123 456</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5" />
                    <span>support@techstore.vn</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiClock className="w-5 h-5" />
                    <span>08:00 - 21:00</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6 text-sm text-center">
              <p>© 2024 TechStore. Tất cả quyền được bảo lưu.</p>
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="top-center" />
    </CartProvider>
  );
} 