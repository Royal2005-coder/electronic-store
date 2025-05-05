import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: String,
  image: String,
  variant: String
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [CartItemSchema],
  subtotal: {
    type: Number,
    default: 0
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'checkout', 'completed'],
    default: 'active'
  },
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    province: String,
    district: String,
    ward: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update timestamps
CartSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to calculate totals
CartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total: number, item: {price: number; quantity: number}) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Calculate shipping fee based on subtotal
  this.shippingFee = this.subtotal > 500000 ? 0 : 30000;
  
  this.total = this.subtotal + this.shippingFee;
};

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;