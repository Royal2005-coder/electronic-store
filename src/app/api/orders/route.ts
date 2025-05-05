import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Order } from '@/types/types';

// Temporary in-memory storage for orders
let orders: Order[] = [];

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { customer, items, total, paymentMethod } = body;

    if (!customer || !items || items.length === 0 || !total || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required order data' }, { status: 400 });
    }

    const newOrder: Order = {
      id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    if (paymentMethod === 'card') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      newOrder.status = 'processing';
    } else {
      newOrder.status = 'processing';
    }

    return NextResponse.json({ orderId: newOrder.id });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId');

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If orderId is provided, return specific order
    if (orderId) {
      const order = orders.find(o => o.id === orderId);

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(order);
    }
    
    // If userId is provided or matches session user, return all orders for that user
    if (userId || session.user.email) {
      const userEmail = userId || session.user.email;
      const userOrders = orders.filter(o => o.customer.email === userEmail);
      
      return NextResponse.json(userOrders);
    }

    return NextResponse.json(
      { error: 'Order ID or user ID is required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
} 