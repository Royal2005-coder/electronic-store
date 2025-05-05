import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, emailTransporter } from '@/config/auth';

// Tạm thời lưu trữ người dùng trong memory (sau này sẽ thay bằng database)
const users: any[] = [];

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Kiểm tra email đã tồn tại
    if (users.find(user => user.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo verification token
    const verificationToken = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Lưu thông tin người dùng
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      isVerified: false,
      verificationToken,
    };
    users.push(user);

    // Gửi email xác thực
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}">
          Verify Email
        </a>
      `,
    });

    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify your account.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 