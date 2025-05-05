import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CART_FILE = path.join(DATA_DIR, 'carts.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty files if they don't exist
if (!fs.existsSync(CART_FILE)) {
  fs.writeFileSync(CART_FILE, '[]');
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Cart operations
export const getCarts = (): Cart[] => {
  const data = fs.readFileSync(CART_FILE, 'utf-8');
  return JSON.parse(data);
};

export const getCartByUserId = (userId: string): Cart | undefined => {
  const carts = getCarts();
  return carts.find(cart => cart.userId === userId);
};

export const saveCart = (cart: Cart): Cart => {
  const carts = getCarts();
  const index = carts.findIndex(c => c.userId === cart.userId);
  
  if (index === -1) {
    carts.push(cart);
  } else {
    carts[index] = cart;
  }
  
  fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));
  return cart;
};

export const deleteCart = (userId: string): void => {
  const carts = getCarts();
  const filteredCarts = carts.filter(cart => cart.userId !== userId);
  fs.writeFileSync(CART_FILE, JSON.stringify(filteredCarts, null, 2));
}; 