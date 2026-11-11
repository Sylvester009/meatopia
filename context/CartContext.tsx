'use client';
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type CartItem = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  weight: string;
  originalPrice?: number;
  discount?: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalOriginalPrice: number;
  totalSavings: number;
};

const CartContext = createContext<CartContextType | null>(null);

const cartChangeEvent = 'cart-change';
const getCartSnapshot = () =>
  typeof window === 'undefined' ? '[]' : window.localStorage.getItem('cart') || '[]';
const getServerCartSnapshot = () => '[]';

function subscribeToCart(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(cartChangeEvent, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(cartChangeEvent, onChange);
  };
}

function readCart(): CartItem[] {
  return JSON.parse(getCartSnapshot()) as CartItem[];
}

function saveCart(cart: CartItem[]) {
  window.localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event(cartChangeEvent));
}

export function CartProvider({children}: {children: React.ReactNode}) {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const cart = useMemo(
    () => JSON.parse(cartSnapshot) as CartItem[],
    [cartSnapshot],
  );

  const addToCart = (item: CartItem) => {
    const previousCart = readCart();
    const existing = previousCart.find(cartItem => cartItem.id === item.id);

    if (existing) {
      saveCart(
        previousCart.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + item.quantity}
            : cartItem,
        ),
      );
      return;
    }

    saveCart([...previousCart, item]);
  };

  function updateQuantity(id: string, qty: number) {
    const previousCart = readCart();
    saveCart(
      qty <= 0
        ? previousCart.filter(item => item.id !== id)
        : previousCart.map(item =>
            item.id === id ? {...item, quantity: qty} : item,
          ),
    );
  }

  function removeItem(id: string) {
    saveCart(readCart().filter(item => item.id !== id));
  }

  const clearCart = () => saveCart([]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart],
  );

  const totalOriginalPrice = useMemo(
    () => cart.reduce((sum, item) => {
      const originalUnitPrice = item.originalPrice || item.unitPrice;
      return sum + originalUnitPrice * item.quantity;
    }, 0),
    [cart],
  );

  const totalSavings = useMemo(
    () => totalOriginalPrice - totalPrice,
    [totalOriginalPrice, totalPrice],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        totalOriginalPrice,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}