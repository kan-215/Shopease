"use client";

import { useState } from "react";

// Sample data for orders and users
const orders = [
  { id: 1, user: "John Doe", status: "Pending", total: 3000 },
  { id: 2, user: "Jane Smith", status: "Completed", total: 5000 },
];

const users = [
  { id: 1, username: "john_doe", role: "Admin" },
  { id: 2, username: "jane_smith", role: "Customer" },
];

const initialProducts = [
  { id: 1, name: "Wireless Earphones", price: 3999, stock: "In Stock" },
  { id: 2, name: "Smart Watch", price: 5999, stock: "Out of Stock" },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [products, setProducts] = useState(initialProducts);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    lowStockProducts: products.filter(product => product.stock === "Out of Stock").length,
    totalUsers: users.length,
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <div className="dashboard-overview">
            <h3>Dashboard Overview</h3>
            <div className="stats-container">
              <div className="stat-item">
                <h4>Total Products</h4>
                <p>{stats.totalProducts}</p>
              </div>
              <div className="stat-item">
                <h4>Total Orders</h4>
                <p>{stats.totalOrders}</p>
              </div>
              <div className="stat-item">
                <h4>Total Revenue</h4>
                <p>KSh {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="stat-item">
                <h4>Low Stock Products</h4>
                <p>{stats.lowStockProducts}</p>
              </div>
              <div className="stat-item">
                <h4>Total Users</h4>
                <p>{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        );
      case "Manage Products":
        return (
          <div className="manage-products">
            <h3>Manage Products</h3>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h4>{product.name}</h4>
                  <p>KSh {product.price.toLocaleString()}</p>
                  <p>Status: {product.stock}</p>
                  <button onClick={() => alert("Product removed")}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "Orders":
        return (
          <div className="manage-orders">
            <h3>Manage Orders</h3>
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <h4>Order #{order.id}</h4>
                  <p>User: {order.user}</p>
                  <p>Status: {order.status}</p>
                  <p>Total: KSh {order.total.toLocaleString()}</p>
                  <button onClick={() => alert("Order status updated")}>Update Status</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case "Users":
        return (
          <div className="manage-users">
            <h3>Manage Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <h4>{user.username}</h4>
                  <p>Role: {user.role}</p>
                  <button onClick={() => alert("User updated")}>Update</button>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <div>Invalid Tab</div>;
    }
  };

  return (
    <div className="admin-dashboard-container">
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
        <div className="dashboard">
          <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
              <li onClick={() => setSelectedTab("Dashboard")}>Dashboard</li>
              <li onClick={() => setSelectedTab("Manage Products")}>Manage Products</li>
              <li onClick={() => setSelectedTab("Orders")}>Orders</li>
              <li onClick={() => setSelectedTab("Users")}>Users</li>
            </ul>
          </div>
          <div className="main-content">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
}
