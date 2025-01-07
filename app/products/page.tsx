"use client"; // Client-side rendering for products

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext"; // Corrected path for ProductContext
import Link from "next/link";

// Define product categories
const categories = [
  "All Products",
  "Furniture",
  "Utensils",
  "Electronics",
  "Home & Entertainment",
  "Clothing",
  "Toys",
  "Sports",
  "Beauty & Health",
];

export default function ProductsPage() {
  const { products } = useProducts(); // Fetch products from context
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []); // Initially use all products from context
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  // State for success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State for loading products
  const [isLoading, setIsLoading] = useState(true);

  // Filter products based on category and search query
  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false); // Stop loading when products are available

      let filtered = products;

      // Filter by category
      if (selectedCategory !== "All Products") {
        filtered = filtered.filter((product) => product.category === selectedCategory);
      }

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered); // Update filtered products
    }
  }, [products, selectedCategory, searchQuery]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle the addition of product to the cart
  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product); // Check if this logs correctly
    addToCart(product);
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => {
      setShowSuccessMessage(false); // Hide message after 3 seconds
    }, 3000);
  };

  // Show loading message while products are being fetched
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div style={productsPageStyle}>
      {/* Navbar */}
      <div style={navbarStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      
      {/* Category Selector */}
      <div style={categorySelectorStyle}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={selectedCategory === category ? activeCategoryButtonStyle : categoryButtonStyle}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Product List */}
      <div style={productListStyle}>
        {currentProducts.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <div style={productImageContainerStyle}>
              <img src={product.image} alt={product.name} style={productImageStyle} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} Ksh</p>
            <button onClick={() => handleAddToCart(product)} style={addToCartButtonStyle}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div style={successMessageStyle}>
          Product added to cart!
        </div>
      )}

      {/* Pagination */}
      <div style={paginationStyle}>
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)} style={paginationButtonStyle}>{"<< Prev"}</button>
        )}
        {pageNumbers.slice(currentPage - 1, currentPage + 2).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={paginationNumberStyle(currentPage === number)}
          >
            {number}
          </button>
        ))}
        {currentPage < pageNumbers.length && (
          <button onClick={() => paginate(currentPage + 1)} style={paginationButtonStyle}>{"Next >>"}</button>
        )}
      </div>
    </div>
  );
}

// Styles
const productsPageStyle = {
  padding: "20px",
  backgroundColor: "#fff",
  color: "#333",
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const linkStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  color: "purple",
};

const searchInputStyle = {
  padding: "10px",
  width: "250px",
  borderRadius: "20px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const categorySelectorStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
  flexWrap: "wrap", // Wrap categories if too many
};

const categoryButtonStyle = {
  padding: "12px 25px",
  margin: "8px",
  backgroundColor: "purple",
  border: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "600",
  borderRadius: "30px",
  transition: "all 0.3s ease",
};

const activeCategoryButtonStyle = {
  ...categoryButtonStyle,
  backgroundColor: "orange", // Highlight active category
};

const productListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "25px",
  marginBottom: "40px",
};

const productCardStyle = {
  padding: "15px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const productImageContainerStyle = {
  position: "relative",
  height: "250px",
  overflow: "hidden", // Prevent image overflow
  borderRadius: "8px",
};

const productImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain", // Maintain aspect ratio and prevent blurring
  transition: "transform 0.3s ease", // Smooth zoom effect
};

const addToCartButtonStyle = {
  backgroundColor: "orange",
  color: "white",
  padding: "10px 25px",
  border: "none",
  cursor: "pointer",
  borderRadius: "30px",
  fontSize: "16px",
  marginTop: "10px",
  transition: "all 0.3s ease",
};

const paginationStyle = {
  textAlign: "center",
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const paginationButtonStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  cursor: "pointer",
  backgroundColor: "purple",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  transition: "background-color 0.3s",
};

const paginationNumberStyle = (isActive) => ({
  padding: "10px 20px",
  margin: "0 5px",
  cursor: "pointer",
  backgroundColor: isActive ? "orange" : "purple",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  transition: "background-color 0.3s",
});

// Success Message Styles (using CSS animation)
const successMessageStyle = {
  position: "fixed",       // Use fixed positioning to place it relative to the viewport
  top: "20px",            // Adjust top position to create space from the top
  right: "20px",          // Position it on the right side
  padding: "10px",
  backgroundColor: "green",
  color: "white",
  fontSize: "18px",
  textAlign: "center",
  borderRadius: "5px",
  zIndex: 1000,           // Ensure it appears above other elements
  opacity: 1,             // Always visible during testing
  transition: "opacity 0.5s ease",
};
