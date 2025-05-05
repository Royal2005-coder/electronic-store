import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route cần xác thực
const protectedRoutes = ['/account'];

// Các route không cần xác thực
const publicRoutes = ['/login', '/register', '/verify-email'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Kiểm tra xem route hiện tại có phải là route được bảo vệ không
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Kiểm tra xem route hiện tại có phải là route công khai không
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Lấy token từ cookie
  const token = request.cookies.get('token')?.value;
  
  // Nếu là route được bảo vệ và không có token, chuyển hướng đến trang đăng nhập
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Nếu đã đăng nhập và cố truy cập trang đăng nhập/đăng ký, chuyển hướng đến trang chủ
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Add CORS headers
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return response;
}

// Chỉ áp dụng middleware cho các route cụ thể
export const config = {
  matcher: [
    '/account/:path*',
    '/login',
    '/register',
    '/verify-email',
  ],
}; 