"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <img src="/logo.png" alt="ShopEase Logo" />
            <h1>ShopEase</h1>
          </Link>
        </div>

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

        {/* Hamburger Menu for Mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
