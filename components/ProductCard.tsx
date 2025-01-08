// components/ProductCard.tsx
import React from 'react';

// Define the Product type based on the new Prisma schema structure
interface Product {
  id: string; // MongoDB uses ObjectId as a string
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">KSh {product.price.toLocaleString()}</p>
      <button className="product-button">View Details</button>
    </div>
  );
};

export default ProductCard;
