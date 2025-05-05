import { Product } from '@/types/types'

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export const addToCart = (product: CartItem): void => {
  // Get existing cart from localStorage
  const existingCart = localStorage.getItem('cart');
  let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product exists
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 0) + 1;
  } else {
    // Add new product with quantity 1
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

}

export const removeFromCart = (cart: CartState, productId: string): CartState => {
  const itemToRemove = cart.items.find(item => item.id === productId)
  
  if (!itemToRemove) return cart

  const priceToDeduct = itemToRemove.discount 
    ? (itemToRemove.price * (1 - itemToRemove.discount)) * itemToRemove.quantity
    : itemToRemove.price * itemToRemove.quantity

  return {
    ...cart,
    items: cart.items.filter(item => item.id !== productId),
    totalItems: cart.totalItems - itemToRemove.quantity,
    totalPrice: cart.totalPrice - priceToDeduct
  }
}

export const updateQuantity = (cart: CartState, productId: string, quantity: number): CartState => {
  if (quantity < 1) {
    return removeFromCart(cart, productId)
  }

  const item = cart.items.find(item => item.id === productId)
  if (!item) return cart

  const quantityDiff = quantity - item.quantity
  const priceDiff = (item.discount ? (item.price * (1 - item.discount)) : item.price) * quantityDiff

  return {
    ...cart,
    items: cart.items.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ),
    totalItems: cart.totalItems + quantityDiff,
    totalPrice: cart.totalPrice + priceDiff
  }
}