"use client";

import { useOrder } from "../../context/OrderContext";

export default function ProfilePage() {
  const { orders } = useOrder();

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Order History:</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order: {order.details} - {order.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
