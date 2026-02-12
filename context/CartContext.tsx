"use client";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Product } from "@/data/product";

export type CartItem = Product & {
  quantity: number;
  weight: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, qty: number) => void
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
  // Assign default quantity and weight
  const newItem: CartItem = {
    ...product,
    quantity: 1,
    weight: "1kg", // or pull from product if it exists
  };

  // Generate unique ID using original id + weight
  const id = `${newItem.id}-${newItem.weight}`;

  setCart((prev) => {
    const existing = prev.find((item) => item.id === id);

    if (existing) {
      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    }

    return [...prev, { ...newItem, id }];
  });
};




  function updateQuantity(id: string, qty: number) {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    })
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([]);


  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // 💰 TOTAL PRICE
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
