import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './CartPage.module.css';
import { formatCurrency } from '@/utils/format';

interface CartItem {
  _id: string;
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface Cart {
  _id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (session?.user) {
      fetchCart();
    }
  }, [session]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch('/api/cart/update-item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch('/api/cart/remove-item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const proceedToCheckout = () => {
    router.push('/checkout/shipping');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <Image
          src="/empty-cart.svg"
          alt="Empty Cart"
          width={200}
          height={200}
        />
        <h2>Giỏ hàng trống</h2>
        <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
        <button
          className={styles.continueShoppingBtn}
          onClick={() => router.push('/products')}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giỏ hàng của bạn</h1>
      
      <div className={styles.content}>
        <div className={styles.cartItems}>
          {cart.items.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                {item.variant && <p className={styles.variant}>Phiên bản: {item.variant}</p>}
                <p className={styles.price}>{formatCurrency(item.price)}</p>
              </div>
              
              <div className={styles.quantityControls}>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className={styles.quantityBtn}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>
              
              <div className={styles.itemTotal}>
                <p>{formatCurrency(item.price * item.quantity)}</p>
              </div>
              
              <button
                onClick={() => removeItem(item._id)}
                className={styles.removeBtn}
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.cartSummary}>
          <h2>Tổng giỏ hàng</h2>
          
          <div className={styles.summaryRow}>
            <span>Tạm tính</span>
            <span>{formatCurrency(cart.subtotal)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Phí vận chuyển</span>
            <span>{formatCurrency(cart.shippingFee)}</span>
          </div>
          
          {cart.shippingFee === 0 && (
            <div className={styles.freeShipping}>
              <span>🎉 Bạn được miễn phí vận chuyển!</span>
            </div>
          )}
          
          <div className={styles.summaryTotal}>
            <span>Tổng cộng</span>
            <span>{formatCurrency(cart.total)}</span>
          </div>
          
          <button
            className={styles.checkoutBtn}
            onClick={proceedToCheckout}
          >
            Tiến hành thanh toán
          </button>
          
          <button
            className={styles.continueShoppingBtn}
            onClick={() => router.push('/products')}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
} 