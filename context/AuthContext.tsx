"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the user interface
interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  orders: string[][]; // Nested arrays for multiple orders
  cart: string[]; // Items in the cart
}

interface AuthContextType {
  user: User | null;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => string | null;
  loginWithEmail: (email: string, password: string) => string | null;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => string | null;
  addToCart: (item: string) => void;
  checkout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Signup function
  const signup = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => {
    const mockUsers: User[] = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    if (mockUsers.find((u) => u.email === email)) {
      return "Email is already registered.";
    }

    const newUser: User = {
      firstName,
      lastName,
      email,
      role,
      orders: [],
      cart: [],
    };
    mockUsers.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return null;
  };

  // Login function
  const loginWithEmail = (email: string, password: string) => {
    const mockUsers: User[] = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const existingUser = mockUsers.find((u) => u.email === email);
    if (!existingUser) {
      return "User not found.";
    }

    setUser(existingUser);
    localStorage.setItem("user", JSON.stringify(existingUser));
    return null;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Reset password function
  const resetPassword = (email: string, newPassword: string) => {
    const mockUsers: User[] = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const userToReset = mockUsers.find((u) => u.email === email);
    if (!userToReset) {
      return "User not found.";
    }

    userToReset.password = newPassword;
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    return null;
  };

  // Add item to cart
  const addToCart = (item: string) => {
    if (user) {
      const updatedUser = { ...user, cart: [...user.cart, item] };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Checkout function
  const checkout = () => {
    if (user && user.cart.length > 0) {
      const updatedUser = {
        ...user,
        orders: [...user.orders, user.cart],
        cart: [],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, loginWithEmail, logout, resetPassword, addToCart, checkout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
