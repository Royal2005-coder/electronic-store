import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/config/auth';

// Sử dụng cùng mảng users từ các file trước
const users: any[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const user = users.find(u => u.email === decoded.email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Cập nhật trạng thái xác thực
    user.isVerified = true;
    user.verificationToken = null;

    return NextResponse.json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Invalid or expired verification token' },
      { status: 400 }
    );
  }
} 