'use client';

import { FiMail } from 'react-icons/fi';

export default function VerifyRequest() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <FiMail className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Kiểm tra email của bạn
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Một liên kết đăng nhập đã được gửi đến email của bạn.
          <br />
          Vui lòng kiểm tra hộp thư (và thư mục spam) để tiếp tục.
        </p>
      </div>
    </div>
  );
} 