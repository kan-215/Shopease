"use client";

import "../styles/globals.css";  // Global styles if needed
import "../styles/layout.css";   // Import layout-specific CSS
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { OrderProvider } from "../context/OrderContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <header className="navbar">
                <div className="navbar-container">
                  <div className="navbar-logo">
                    <Link href="/">
                      <img src="/logo.png" alt="ShopEase Logo" />
                      <h1>ShopEase</h1>
                    </Link>
                  </div>

                  {/* Navbar Links for Desktop */}
                  <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/cart">
                      <FaShoppingCart />
                    </Link>
                    <Link href="/profile">
                      <FaUser />
                    </Link>
                  </nav>

                  {/* Hamburger Menu for Mobile */}
                  <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                  </div>
                </div>
              </header>

              {/* Content of the home page */}
              {children}

              <footer>
                <p>&copy; 2025 ShopEase. All rights reserved.</p>
              </footer>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
