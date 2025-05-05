'use client';

import Link from 'next/link';

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Đã xảy ra lỗi khi đăng nhập
        </h2>
        <p className="text-gray-600 mt-2">
          Vui lòng thử lại hoặc liên hệ hỗ trợ nếu lỗi vẫn tiếp tục.
        </p>
        <div className="mt-6">
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </Link>
        </div>
      </div>
    </div>
  );
} 