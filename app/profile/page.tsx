"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedOrders = localStorage.getItem("orders");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("orders");
    setIsLoggedOut(true);
    setTimeout(() => {
      router.push("/signup");
    }, 3000);
  };

  return (
    <div>
      {isLoggedOut ? (
        <div>
          <h2>You have been logged out.</h2>
          <p>Please log in again to continue.</p>
          <Link href="/signup">
            <button>Go to Sign In</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>Welcome, {user?.name || "Guest"}!</h1>

          <h2>Order History:</h2>
          {orders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Shipping Address</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.productName}</td>
                    <td>{order.shippingAddress}</td>
                    <td>{`KSh ${order.price.toLocaleString()}`}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders placed yet.</p>
          )}

          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
}
