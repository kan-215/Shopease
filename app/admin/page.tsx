"use client";

import { useState } from "react";

// Sample initial products
const initialProducts = [
  { id: 1, name: "Wireless Earphones", price: 3999 },
  { id: 2, name: "Smart Watch", price: 5999 },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  // Handle adding a product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name.trim() === "" || newProduct.price.trim() === "") {
      alert("Please provide valid product details.");
      return;
    }

    const newProductEntry = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price, 10),
    };
    setProducts((prevProducts) => [...prevProducts, newProductEntry]);
    setNewProduct({ name: "", price: "" });
  };

  // Handle removing a product
  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>

          {/* Add Product Section */}
          <form onSubmit={handleAddProduct} className="add-product-form">
            <h2>Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button type="submit">Add Product</button>
          </form>

          {/* Manage Products Section */}
          <div className="manage-products">
            <h2>Manage Products</h2>
            {products && products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p>KSh {product.price.toLocaleString()}</p>
                    <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
