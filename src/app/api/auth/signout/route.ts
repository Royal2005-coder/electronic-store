import { signOut } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ success: true, message: 'Đăng xuất thành công' });
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng xuất' }, 
      { status: 500 }
    );
  }
} 