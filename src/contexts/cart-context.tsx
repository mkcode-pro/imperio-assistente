import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { CartItem, ShippingOption } from '@/hooks/use-cart';

interface CartContextType {
  cartItems: CartItem[];
  selectedShipping: ShippingOption | null;
  addToCart: (productId: string, onProductAdded?: (productId: string) => void) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalItems: () => number;
  clearCart: () => void;
  setShipping: (shipping: ShippingOption | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}