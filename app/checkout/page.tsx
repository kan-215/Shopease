"use client"; // Ensure this is a client-side component

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "../../context/OrderContext"; // Assuming useOrder is your custom context
import { useCart } from "../../context/CartContext"; // Import useCart hook

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Kenya",
    phoneNumber: "", // Add phone number for Mpesa
  });
  const [paymentMethod, setPaymentMethod] = useState("mpesa"); // Default to Mpesa
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null); // Token for Turnstile verification
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const { addOrder } = useOrder(); // Assuming this context adds orders to state/context
  const { cartItems, clearCart } = useCart(); // Get cartItems from CartContext
  const router = useRouter();

  useEffect(() => {
    const loadTurnstile = () => {
      if (typeof window !== "undefined" && (window as any).turnstile) {
        const turnstile = (window as any).turnstile;

        turnstile.render(turnstileRef.current, {
          sitekey: "0x4AAAAAAA4xEhIKL6Jv0pd-", // Replace with your site key
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "expired-callback": () => {
            setTurnstileToken(null);
          },
          action: "manual-challenge", // Enforce manual user interaction
        });
      }
    };

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.onload = loadTurnstile; // Initialize widget once script loads
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    // Only proceed if shipping info is complete and Turnstile challenge is passed
    if (shippingInfo.name.trim() && shippingInfo.address.trim() && turnstileToken) {
      setIsProcessingPayment(true);

      // Prepare the order details for each product in the cart
      const orders = cartItems.map((product) => ({
        id: new Date().getTime(), // Generate a simple unique ID based on time
        productName: product.productName, // Ensure this is being passed correctly
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`,
        price: product.price,
        date: new Date().toLocaleDateString(),
      }));

      // Save all orders in localStorage
      const storedOrders = localStorage.getItem("orders");
      const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
      allOrders.push(...orders);
      localStorage.setItem("orders", JSON.stringify(allOrders));

      // Add the orders to context
      orders.forEach((order) => addOrder(order)); // Assuming addOrder adds each order to the context

      // Clear the cart after checkout is completed
      clearCart(); // This will reset the cart via the CartContext

      // Handle payment depending on the method
      if (paymentMethod === "mpesa") {
        await handleMpesaPayment();
      } else if (paymentMethod === "stripe") {
        await handleStripePayment();
      }

      setIsProcessingPayment(false);
    } else {
      alert("Please fill in the shipping details and complete the Turnstile challenge.");
    }
  };

  const handleMpesaPayment = async () => {
    console.log("Processing Mpesa payment...");
    // After successful payment
    router.push("/checkout/thank-you");
  };

  const handleStripePayment = async () => {
    // Stripe payment handling logic
    // Example: Call your backend to create a payment intent
    // const { clientSecret } = await fetch('/api/create-payment-intent').then(res => res.json());

    // Handle error if any, or success
    router.push("/checkout/thank-you");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h3>Shipping Information</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={shippingInfo.name}
          onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street Address"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={shippingInfo.country}
          disabled
        />

        {/* Phone number for Mpesa */}
        {paymentMethod === "mpesa" && (
          <input
            type="text"
            placeholder="Mpesa Phone Number"
            value={shippingInfo.phoneNumber}
            onChange={(e) => setShippingInfo({ ...shippingInfo, phoneNumber: e.target.value })}
          />
        )}

        <h3>Choose Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={paymentMethod === "mpesa"}
              onChange={() => setPaymentMethod("mpesa")}
            />
            Mpesa
          </label>
          <label>
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            />
            Stripe
          </label>
        </div>

        <div>
          <h3>Please complete the Turnstile challenge below before proceeding to payment:</h3>
          {/* Render Turnstile widget */}
          <div ref={turnstileRef}></div>
        </div>

        <button onClick={handleCheckout} disabled={isProcessingPayment || !turnstileToken}>
          {isProcessingPayment ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
