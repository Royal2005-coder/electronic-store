'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import ErrorMessage from '@/components/ErrorMessage';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signIn('google', {
        callbackUrl: '/account',
        redirect: false
      });
      
      if (result?.error) {
        switch (result.error) {
          case 'AccessDenied':
            setError('Quyền truy cập bị từ chối. Vui lòng thử lại.');
            break;
          case 'EmailSignin':
            setError('Có lỗi khi gửi email xác thực. Vui lòng thử lại.');
            break;
          case 'OAuthSignin':
            setError('Có lỗi khi kết nối với Google. Vui lòng thử lại.');
            break;
          case 'OAuthCallback':
            setError('Có lỗi khi nhận thông tin từ Google. Vui lòng thử lại.');
            break;
          default:
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Có lỗi xảy ra khi đăng nhập với Google. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              đăng nhập nếu bạn đã có tài khoản
            </Link>
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-150 ease-in-out ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            aria-label="Đăng ký với Google"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.722-1.502,3.178-2.945,4.181c-1.445,1.003-3.176,1.509-4.909,1.509c-2.4,0-4.727-0.952-6.439-2.664c-1.712-1.712-2.664-4.039-2.664-6.439c0-2.4,0.952-4.727,2.664-6.439c1.712-1.712,4.039-2.664,6.439-2.664c1.733,0,3.464,0.506,4.909,1.509c1.443,1.003,2.498,2.459,2.945,4.181h-3.536c-1.054,0-1.909,0.855-1.909,1.909" />
              </svg>
            )}
            <span>{loading ? 'Đang xử lý...' : 'Đăng ký với Google'}</span>
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Bằng cách đăng ký, bạn đồng ý với
              </span>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-gray-600">
            <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
              Điều khoản dịch vụ
            </Link>
            {' '}và{' '}
            <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
              Chính sách bảo mật
            </Link>
            {' '}của chúng tôi
          </div>
        </div>
      </div>
    </div>
  );
} 