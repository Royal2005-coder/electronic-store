import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDB } from '@/lib/mongoose';
import Cart from '@/models/Cart';
import User from '@/models/User';
import Product from '../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { productId, quantity, variant } = req.body;
    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    await connectToDB();

    // Get user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get or create cart
    let cart = await Cart.findOne({
      user: user._id,
      status: 'active'
    });

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        items: [],
        status: 'active'
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: { product: { toString: () => string }; variant?: string }) => 
        item.product.toString() === productId &&
        (!variant || item.variant === variant)
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images[0].url : null,
        variant
      });
    }

    // Calculate totals
    cart.calculateTotals();
    await cart.save();

    return res.status(200).json({
      success: true,
      cart: {
        _id: cart._id,
        items: cart.items.map((item: {
          _id: any;
          product: any;
          name: string;
          image: string;
          price: number;
          quantity: number;
          variant?: string;
        }) => ({
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
    console.error('Add to Cart Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}