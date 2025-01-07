"use client";

import "../styles/globals.css"; // Global styles
import "../styles/layout.css"; // Layout-specific styles
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaEnvelope } from "react-icons/fa";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { OrderProvider } from "../context/OrderContext";
import { ProductProvider } from "../context/ProductContext";

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
              <ProductProvider>
                <header className="navbar">
                  <div className="navbar-container">
                    <Link href="/" className="navbar-logo">
                      <img src="/logo.png" alt="ShopEase Logo" />
                    </Link>

                    {/* Navbar Links */}
                    <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                      <Link href="/">Home</Link>
                      <Link href="/products">Products</Link>
                      <Link href="/cart">
                        <FaShoppingCart />
                      </Link>
                      <Link href="/profile">
                        <FaUser />
                      </Link>
                      <a href="mailto:shopease254@gmail.com" className="contact-us-link">
                        <FaEnvelope />
                      </a>
                    </nav>

                    {/* Hamburger Menu */}
                    <div className="menu-icon" onClick={toggleMenu}>
                      {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main>{children}</main>

                {/* Footer */}
                <footer>
                  <p>&copy; 2025 ShopEase. All rights reserved.</p>
                </footer>
              </ProductProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
