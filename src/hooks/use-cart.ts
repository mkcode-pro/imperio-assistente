import { useState } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShippingOption {
  name: string;
  price: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  const addToCart = (productId: string, onProductAdded?: (productId: string) => void) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      
      if (existingItem) {
        const updatedItems = prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        onProductAdded?.(productId);
        return updatedItems;
      } else {
        onProductAdded?.(productId);
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const setShipping = (shipping: ShippingOption | null) => {
    setSelectedShipping(shipping);
  };

  return {
    cartItems,
    selectedShipping,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart,
    setShipping
  };
}