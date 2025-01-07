"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the product type
interface Product {
  id: number;
  productName: string;
  price: number;
}

// Define the context types
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  message: string;
}

// Create the Cart Context with a default value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  // Add to Cart Function
  const addToCart = (product: Product): boolean => {
    // Check if the product already exists in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setMessage("Product is already in the cart!");
      setTimeout(() => setMessage(""), 3000);
      return false; // Indicate failure (product already in cart)
    } else {
      setCartItems((prevItems) => [...prevItems, product]);
      setMessage("Product added to cart successfully!");
      setTimeout(() => setMessage(""), 3000);
      return true; // Indicate success
    }
  };

  // Remove from Cart Function
  const removeFromCart = (productId: number): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    setMessage("Product removed from cart!");
    setTimeout(() => setMessage(""), 3000);
  };

  // Clear Cart Function
  const clearCart = (): void => {
    setCartItems([]); // Clear the cart
    setMessage("Cart cleared!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        message,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for using Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
