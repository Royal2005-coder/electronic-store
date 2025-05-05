import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getCartByUserId, saveCart, Cart, CartItem } from '@/lib/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const cart = getCartByUserId(userId) || {
          id: Math.random().toString(36).substr(2, 9),
          userId,
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
      }
      break;

    case 'POST':
      try {
        const { productId, quantity, price } = req.body;
        let cart = getCartByUserId(userId);

        if (!cart) {
          cart = {
            id: Math.random().toString(36).substr(2, 9),
            userId,
            items: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }

        const existingItemIndex = cart.items.findIndex(
          item => item.productId === productId
        );

        if (existingItemIndex > -1) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, price });
        }

        cart.updatedAt = new Date().toISOString();
        const updatedCart = saveCart(cart);
        res.status(200).json(updatedCart);
      } catch (error) {
        res.status(500).json({ error: 'Error updating cart' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 