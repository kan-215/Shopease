"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // Dynamically import Leaflet for client-side only
import { loadStripe } from "@stripe/stripe-js";

// Dynamically import the Map component for Leaflet (SSR is disabled)
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const stripePromise = loadStripe("your-stripe-publishable-key"); // Use your actual Stripe key

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
  const router = useRouter();

  const handleCheckout = async () => {
    if (shippingInfo.name.trim() && shippingInfo.address.trim()) {
      setIsProcessingPayment(true);

      // Handle payment depending on the method
      if (paymentMethod === "mpesa") {
        // Call the backend API to initiate Mpesa payment (you can pass the necessary data)
        await handleMpesaPayment();
      } else if (paymentMethod === "stripe") {
        // Call Stripe API to handle Stripe payment (you would need to set up a backend for this)
        await handleStripePayment();
      }

      setIsProcessingPayment(false);
    } else {
      alert("Please fill in the shipping details.");
    }
  };

  const handleMpesaPayment = async () => {
    // Integrate the Mpesa payment process using your backend API
    // Example: Call your API to initiate Mpesa payment
    console.log("Processing Mpesa payment...");
    // After successful payment
    router.push("/checkout/thank-you");
  };

  const handleStripePayment = async () => {
    // Call the Stripe API (assuming you have set up a backend endpoint to handle payment)
    const stripe = await stripePromise;
    // You should call your backend to create a payment intent
    // const { clientSecret } = await fetch('/api/create-payment-intent').then(res => res.json());

    // const { error } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: cardElement, // Use Stripe Elements for Card input
    //   },
    // });

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

        <button onClick={handleCheckout} disabled={isProcessingPayment}>
          {isProcessingPayment ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
