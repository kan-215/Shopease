import React from 'react';

const OrderSummary = ({ cartItems, totalPrice, shippingDetails }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x Ksh {item.price}
          </li>
        ))}
      </ul>
      <p>Total: Ksh {totalPrice}</p>
      <p>Shipping to: {shippingDetails.street}, {shippingDetails.city}</p>
      <button>Confirm Order</button>
    </div>
  );
};

export default OrderSummary;
