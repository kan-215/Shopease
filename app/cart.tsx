// app/cart.tsx
"use client"; // Marking this file as a client component

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    // Handle checkout logic (e.g., redirect to checkout page, payment integration)
    router.push('/checkout');
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  return (
    <div style={cartStyle}>
      <h1>Your Cart</h1>
      <div style={cartItemsStyle}>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map(item => (
            <div key={item.id} style={cartItemStyle}>
              <img src={item.image} alt={item.name} style={imageStyle} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div>
                  <label>Quantity:</label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))} 
                    min="1"
                  />
                </div>
                <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div style={checkoutStyle}>
          <button onClick={handleCheckout} style={checkoutButtonStyle}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

const cartStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const cartItemsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginTop: '20px',
};

const cartItemStyle = {
  display: 'flex',
  gap: '20px',
  padding: '10px',
  border: '1px solid #ddd',
  backgroundColor: 'white',
};

const imageStyle = {
  width: '80px',
  height: '80px',
};

const removeButtonStyle = {
  backgroundColor: 'var(--orange)',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

const checkoutStyle = {
  marginTop: '20px',
};

const checkoutButtonStyle = {
  backgroundColor: 'var(--blue)',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};
