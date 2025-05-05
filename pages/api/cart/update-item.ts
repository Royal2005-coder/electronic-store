import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDB } from '@/lib/mongoose';
import Cart from '@/models/Cart';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { itemId, quantity } = req.body;
    if (!itemId || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    await connectToDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = await Cart.findOne({
      user: user._id,
      status: 'active'
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and update the item quantity
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.calculateTotals();
    await cart.save();

    return res.status(200).json({
      success: true,
      cart: {
        _id: cart._id,
        items: cart.items.map(item => ({
          _id: item._id,
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant
        })),
        subtotal: cart.subtotal,
        shippingFee: cart.shippingFee,
        total: cart.total
      }
    });
  } catch (error) {
    console.error('Update Cart Item Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 