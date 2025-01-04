"use client"; // Ensure this is a client-side component

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price || 0), 0);

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout"); // Redirect to the checkout page
  };

  if (!user) {
    return (
      <div>
        <p>You must be logged in to view your cart.</p>
        <button onClick={() => router.push("/signup")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" style={{ textDecoration: "underline", color: "blue" }}>
            Go back to shopping
          </Link>
        </div>
      ) : (
        <>
          <div>
            {cartItems.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>KSh {item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <h3>Total: KSh {totalAmount.toLocaleString()}</h3>
          </div>

          {/* Proceed to checkout button */}
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}
