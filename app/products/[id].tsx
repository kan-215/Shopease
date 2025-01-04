"use client"; // Ensures client-side rendering for this component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct router import
import { useCart } from "../../context/CartContext";

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Sofa",
    category: "Furniture",
    price: 20000,
    image: "/images/sofa.jpg",
    description: "Material: Fabric, Wood. Dimensions: 200 x 90 x 85 cm. Comfortable and stylish sofa for your living room."
  },
  {
    id: 2,
    name: "Dining Table",
    category: "Furniture",
    price: 15000,
    image: "/images/Dining Table.jpg",
    description: "Material: Wood. Dimensions: 150 x 80 x 75 cm. A stylish dining table for your home."
  },
  {
    id: 3,
    name: "Coffee Table",
    category: "Furniture",
    price: 8000,
    image: "/images/Coffe Table.jpg",
    description: "Material: Wood, Glass. Dimensions: 120 x 60 x 45 cm. A sleek coffee table perfect for any space."
  }
  // Add more products if necessary
];

const ProductDetailPage = () => {
  const { id } = useRouter().query; // Capture the product ID from the URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedProduct = allProducts.find((prod) => prod.id.toString() === id);
      setProduct(selectedProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("Product added to cart!");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto", borderRadius: "5px" }} />
      <p>{product.description}</p>
      <p>KSh {product.price.toLocaleString()}</p>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: "#FF6347",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
