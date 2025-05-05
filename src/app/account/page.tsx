'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiEdit2, FiSave, FiX, FiCamera, FiLock, FiBell, FiGlobe, FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Product } from '@/types/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  bio: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

interface TabItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

const TABS: TabItem[] = [
  { icon: FiUser, label: 'Thông tin cá nhân', value: 'profile' },
  { icon: FiPackage, label: 'Đơn hàng', value: 'orders' },
  { icon: FiHeart, label: 'Danh sách yêu thích', value: 'wishlist' },
  { icon: FiSettings, label: 'Cài đặt', value: 'settings' }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const tabVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '/images/avatar-placeholder.png',
    birthDate: '',
    gender: 'other',
    bio: '',
    socialLinks: {}
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true
  });
  const [language, setLanguage] = useState('vi');
  const [theme, setTheme] = useState('light');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (session?.user) {
      // Use type assertion to access additional properties
      const user = session.user as any;
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.image || '/images/avatar-placeholder.png',
        birthDate: user.birthDate || '',
        gender: user.gender || 'other',
        bio: user.bio || '',
        socialLinks: user.socialLinks || {}
      });
    }
  }, [session]);

  useEffect(() => {
    // Fetch user orders
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Không thể tải đơn hàng');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch user wishlist
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/user/wishlist');
        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (session?.user) {
      fetchOrders();
      fetchWishlist();
    }
  }, [session]);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut({ 
        redirect: false,
        callbackUrl: '/auth/signin'
      });
      toast.success('Đăng xuất thành công');
      router.push('/auth/signin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (session?.user) {
      // Use type assertion to access additional properties
      const user = session.user as any;
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.image || '/images/avatar-placeholder.png',
        birthDate: user.birthDate || '',
        gender: user.gender || 'other',
        bio: user.bio || '',
        socialLinks: user.socialLinks || {}
      });
    }
  };

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    setShowConfirmation(false);
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Cập nhật thông tin thành công');
      setIsEditing(false);
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // and get back a URL. For now, we'll just use a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          avatar: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/user/wishlist?productId=${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setWishlist(wishlist.filter(item => item.id !== productId));
        toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
      } else {
        throw new Error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Không thể xóa sản phẩm khỏi danh sách yêu thích');
    }
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to the server
    toast.success('Đã lưu cài đặt');
  };

  // If not authenticated, redirect to login
  if (status === 'unauthenticated') {
    router.replace('/auth/signin');
    return null;
  }

  // If loading, show loading state with animation
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Đang tải...</p>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Thông tin cá nhân</h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <FiEdit2 className="mr-2" />
            Chỉnh sửa
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              <FiX className="mr-2" />
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <FiSave className="mr-2" />
              Lưu
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative group">
            <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gray-200 shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <FiCamera className="w-8 h-8 mb-2" />
                  <span className="text-sm">Thay đổi ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="text-center mt-6 space-y-1">
              <h3 className="font-semibold text-xl text-gray-800">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
              {profile.bio && (
                <p className="text-sm text-gray-500 mt-2 italic">"{profile.bio}"</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Giới tính</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'male' | 'female' | 'other' })}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Giới thiệu bản thân</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                placeholder={isEditing ? "Viết vài điều về bản thân..." : ""}
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                  !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white hover:border-primary/50'
                }`}
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-6 border-t">
              <h4 className="font-medium text-gray-700 mb-4">Liên kết mạng xã hội</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Facebook</label>
                  <input
                    type="url"
                    value={profile.socialLinks.facebook || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/username"
                    className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white hover:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    type="url"
                    value={profile.socialLinks.instagram || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white hover:border-primary/50"
                  />
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600">
                * Vui lòng điền đầy đủ thông tin để chúng tôi có thể phục vụ bạn tốt hơn.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Xác nhận</h2>
            <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn lưu thay đổi?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-300"
              >
                Hủy
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-300"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
          <Link href="/shop" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status === 'completed' ? 'Đã giao' :
                 order.status === 'processing' ? 'Đang xử lý' :
                 order.status === 'cancelled' ? 'Đã hủy' :
                 'Chờ xử lý'}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">Tổng tiền:</p>
              <p className="font-semibold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(order.total)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderWishlistTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Danh sách yêu thích</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
          <Link href="/shop" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-primary font-semibold mb-4">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(product.price)}
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                  >
                    Xem chi tiết
                  </Link>
                  <button
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Cài đặt tài khoản</h2>
      
      <div className="space-y-8">
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FiBell className="mr-2" />
            Thông báo
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo qua email</p>
                <p className="text-sm text-gray-600">Nhận thông báo về đơn hàng và cập nhật tài khoản</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cập nhật đơn hàng</p>
                <p className="text-sm text-gray-600">Nhận thông báo khi trạng thái đơn hàng thay đổi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.orderUpdates}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    orderUpdates: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Khuyến mãi</p>
                <p className="text-sm text-gray-600">Nhận thông báo về các ưu đãi và khuyến mãi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.promotions}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    promotions: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bản tin</p>
                <p className="text-sm text-gray-600">Đăng ký nhận bản tin về sản phẩm mới và tin tức</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.newsletter}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    newsletter: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Language Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FiGlobe className="mr-2" />
            Ngôn ngữ
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="language"
                value="vi"
                checked={language === 'vi'}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>Tiếng Việt</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>English</span>
            </label>
          </div>
        </div>
        
        {/* Theme Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FiGlobe className="mr-2" />
            Giao diện
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>Sáng</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>Tối</span>
            </label>
          </div>
        </div>
        
        {/* Security Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FiLock className="mr-2" />
            Bảo mật
          </h3>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-left">
              Đổi mật khẩu
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-left">
              Xác thực hai yếu tố
            </button>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Tài khoản của tôi
          </h1>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Optimized Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || !isMobile) && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={tabVariants}
                className={`w-full md:w-64 space-y-3 ${
                  isMobile ? 'fixed inset-0 z-50 bg-white p-4' : ''
                }`}
              >
                {isMobile && (
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {TABS.map(({ icon: Icon, label, value }) => (
                    <motion.button
                      key={value}
                      onClick={() => {
                        setActiveTab(value);
                        if (isMobile) setIsSidebarOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        activeTab === value
                          ? 'bg-primary text-white shadow-lg'
                          : 'hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${
                        activeTab === value ? 'transform rotate-12' : 'group-hover:rotate-12'
                      }`} />
                      <span className="font-medium">{label}</span>
                      {activeTab === value && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute right-2 w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-300"
                    disabled={isLoading}
                  >
                    <FiLogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="font-medium">
                      {isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Optimized Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'wishlist' && renderWishlistTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 