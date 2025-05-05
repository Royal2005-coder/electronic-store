export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  brand: string
  description: string
  rating: number
  reviews: number
  discount?: number
  isNew?: boolean
  isFeatured?: boolean
  specs: {
    [key: string]: string | string[]
  }
  colors: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  state: 'idle' | 'loading' | 'error'
  error: string | null
}

export interface CustomerInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  paymentMethod: 'cod' | 'card'
}

export interface Order {
  id: string
  customer: CustomerInfo
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon?: string
  color?: string
}

export interface Brand {
  id: string
  name: string
  logo?: string
} 