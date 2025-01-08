// pages/product/[id].tsx

"use client"; // For client-side rendering
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // Fetch the product details using the ID
  useEffect(() => {
    if (!id) return; // Wait until the ID is available
    const selectedProduct = allProducts.find((prod) => prod.id === Number(id));
    setProduct(selectedProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div style={productDetailStyle}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={productImageStyle} />
      <p>{product.description}</p>
      <p>KSh {product.price.toLocaleString()}</p>

      <button
        onClick={handleAddToCart}
        style={addToCartButtonStyle}
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

const productDetailStyle = {
  textAlign: "center",
  padding: "20px",
};

const productImageStyle = {
  width: "300px",
  height: "auto",
  borderRadius: "5px",
};

const addToCartButtonStyle = {
  backgroundColor: "#FF6347",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

export default ProductDetailPage;
