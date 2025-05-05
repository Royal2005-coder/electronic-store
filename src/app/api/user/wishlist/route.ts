import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongoose';
import User from '../../../../models/User';
import { Product } from '@/types/types';

// Temporary in-memory storage for wishlist items
const wishlistItems: Record<string, Product[]> = {};

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In a real app, you would fetch from the database
    // For now, we'll use in-memory storage
    const userWishlist = wishlistItems[session.user.email] || [];

    return NextResponse.json(userWishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would update the database
    // For now, we'll use in-memory storage
    const userWishlist = wishlistItems[session.user.email] || [];
    
    // Check if product already exists in wishlist
    const existingProduct = userWishlist.find(item => item.id === productId);
    
    if (existingProduct) {
      return NextResponse.json(
        { message: 'Product already in wishlist' },
        { status: 200 }
      );
    }
    
    // Add product to wishlist
    // In a real app, you would fetch the product from the database
    // For now, we'll use a placeholder
    const product: Product = {
      id: productId,
      name: 'Product Name',
      price: 0,
      image: '/images/products/placeholder.jpg',
      category: 'Category',
      brand: 'Brand',
      description: 'Description',
      rating: 0,
      reviews: 0,
      specs: {},
      colors: []
    };
    
    userWishlist.push(product);
    wishlistItems[session.user.email] = userWishlist;

    return NextResponse.json({
      message: 'Product added to wishlist',
      wishlist: userWishlist
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would update the database
    // For now, we'll use in-memory storage
    const userWishlist = wishlistItems[session.user.email] || [];
    
    // Remove product from wishlist
    const updatedWishlist = userWishlist.filter(item => item.id !== productId);
    wishlistItems[session.user.email] = updatedWishlist;

    return NextResponse.json({
      message: 'Product removed from wishlist',
      wishlist: updatedWishlist
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 