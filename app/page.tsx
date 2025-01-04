"use client"; // Client-side component

import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import "react-toastify/dist/ReactToastify.css";

// Sample data for products
const products = [
  { id: 1, name: "Wireless Earphones", price: 3999, image: "/images/eps.jpg", category: "Electronics", description: "High-quality sound,<br /> long battery life,<br /> Bluetooth connectivity." },
  { id: 2, name: "Bluetooth Speaker", price: 2499, image: "/images/bluetooth-speaker.jpg", category: "Electronics", description: "Portable,<br /> 10-hour battery,<br /> crystal clear sound." },
  { id: 3, name: "Smart Watch", price: 5999, image: "/images/smartwatch.jpg", category: "Electronics", description: "Track your fitness,<br /> monitor heart rate,<br /> waterproof." },
  { id: 4, name: "Laptop", price: 45000, image: "/images/laptop.jpg", category: "Computers", description: "16GB RAM,<br /> 512GB SSD,<br /> Intel i7 Processor." },
  { id: 5, name: "Smartphone", price: 25000, image: "/images/smartphone.jpg", category: "Electronics", description: "6GB RAM,<br /> 128GB storage,<br /> 6.5-inch display." },
  { id: 6, name: "4K TV", price: 55000, image: "/images/4k-tv.jpg", category: "Electronics", description: "Ultra HD 4K,<br /> 55-inch,<br /> smart TV with WiFi." },
  { id: 7, name: "Wireless Earbuds", price: 1999, image: "/images/wireless-earbuds.jpg", category: "Electronics", description: "Compact,<br /> noise-cancelling,<br /> comfortable fit." },
  { id: 8, name: "Digital Camera", price: 35000, image: "/images/digital-camera.jpg", category: "Electronics", description: "20MP,<br /> 4K video,<br /> compact design for on-the-go." },
  { id: 9, name: "Gaming Console", price: 20000, image: "/images/gaming-console.jpg", category: "Gaming", description: "High-performance gaming,<br /> includes two controllers." },
  { id: 10, name: "Electric Kettle", price: 1200, image: "/images/electric-kettle.jpg", category: "Home Appliances", description: "1.5L capacity,<br /> fast boiling,<br /> automatic shut-off." },
  { id: 11, name: "Blender", price: 3000, image: "/images/blender.jpg", category: "Home Appliances", description: "3-speed settings,<br /> 1.2L capacity,<br /> easy to clean." },
  { id: 12, name: "Coffee Maker", price: 8000, image: "/images/coffee.jpg", category: "Home Appliances", description: "Brews 12 cups,<br /> programmable,<br /> with stainless steel carafe." },
  { id: 13, name: "Gaming Mouse", price: 1500, image: "/images/gaming.jpg", category: "Gaming", description: "High-precision sensor,<br /> customizable buttons." },
  { id: 14, name: "Smart Light Bulb", price: 500, image: "/images/smart-bulb.jpg", category: "Home Automation", description: "Adjustable brightness,<br /> compatible with smart home systems." },
  { id: 15, name: "Smart Thermostat", price: 15000, image: "/images/thermo.jpg", category: "Home Automation", description: "Energy-efficient,<br /> remote control,<br /> programmable schedule." },
  { id: 16, name: "Robot Vacuum", price: 18000, image: "/images/r-vacuum.jpg", category: "Home Appliances", description: "Automatic cleaning,<br /> intelligent navigation,<br /> quiet operation." },
  { id: 17, name: "Air Purifier", price: 22000, image: "/images/purifier.jpg", category: "Home Appliances", description: "HEPA filter,<br /> reduces allergens,<br /> quiet operation." },
  { id: 18, name: "Gaming Chair", price: 13000, image: "/images/gaming-chair.jpg", category: "Gaming", description: "Ergonomic design,<br /> adjustable armrests,<br /> reclining feature." },
  { id: 19, name: "RAMTONS Electric Fan", price: 2000, image: "/images/electric-fan.jpg", category: "Home Appliances", description: "3-speed settings,<br /> oscillating function,<br /> 16-inch blade." },
  { id: 20, name: "LG Air Conditioner", price: 35000, image: "/images/air-conditioner.jpg", category: "Home Appliances", description: "Energy-efficient,<br /> 1.5 ton,<br /> fast cooling." }
];

// Categories
const categories = [
  "All", "Electronics", "Computers", "Gaming", "Home Appliances", "Home Automation"
];

export default function Home() {
  const { addToCart } = useCart(); // Access the addToCart function from the context
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle changes in the search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term and selected category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  // Handle category filter
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle adding items to the cart
  const handleAddToCart = (product) => {
    const success = addToCart(product); // Add the product to the cart
    if (success) {
      toast.success(`"${product.name}" added to the cart successfully!`, {
        position: "top-right",
      });
    } else {
      toast.error(`"${product.name}" is already in the cart.`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <Link href="/" className="logo">
          ShopEase
        </Link>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      {/* Categories section */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <div className="product-info">
              <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <p>KSh {product.price.toLocaleString()}</p>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
