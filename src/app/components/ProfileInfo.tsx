'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './ProfileInfo.module.css';
import UserDetailModal from './UserDetailModal';

interface Location {
  id: string;
  name: string;
}

interface ProfileData {
  name: string;
  birthDate: Date | null;
  gender: 'Nam' | 'Nữ' | 'Khác';
  province: string;
  district: string;
  ward: string;
  address: string;
  avatar: string;
}

interface ApiResponse {
  success: boolean;
  profile?: ProfileData;
  error?: string;
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  joinDate: string;
  totalOrders: number;
}

export default function ProfileInfo() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(true); // Set to true to show modal by default
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: new Date().toLocaleDateString('vi-VN'),
    totalOrders: 0
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    birthDate: null,
    gender: 'Nam',
    province: '',
    district: '',
    ward: '',
    address: '',
    avatar: ''
  });

  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: (session.user as any).phone || '',
        address: (session.user as any).address || '',
        joinDate: new Date().toLocaleDateString('vi-VN'),
        totalOrders: 5 // Giả lập số đơn hàng
      });
    }
  }, [session]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Xử lý cập nhật thông tin
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
      />
    </>
  );
} 