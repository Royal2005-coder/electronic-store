import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import mongoose from 'mongoose';
import User from '../../../../models/User';
import { connectToDB } from '@/lib/mongoose';

// Sử dụng cùng mảng users từ các file trước

export async function PUT(request: Request) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, phone, address, avatar, birthDate, gender, bio, socialLinks } =
      await request.json();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.avatar = avatar || user.avatar;
    user.birthDate = birthDate || user.birthDate;
    user.gender = gender || user.gender;
    user.bio = bio || user.bio;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        birthDate: user.birthDate,
        gender: user.gender,
        bio: user.bio,
        socialLinks: user.socialLinks,
      },
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
