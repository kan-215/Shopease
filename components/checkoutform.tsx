import { useState } from 'react';

function CheckoutForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  const handlePaymentSubmit = async () => {
    if (!phoneNumber || !amount) {
      alert('Please enter a valid phone number and amount.');
      return;
    }

    setIsPaymentStarted(true);

    // Call your server to initiate the STK Push
    const response = await fetch('/api/initiate-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, amount }),
    });

    const data = await response.json();

    if (data.StatusCode === 0) {
      alert('Payment initiated. Please check your M-Pesa for the payment prompt.');
    } else {
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <h1>Payment Checkout</h1>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePaymentSubmit}>Pay Now</button>

      {isPaymentStarted && <p>Processing your payment... Please wait for the prompt.</p>}
    </div>
  );
}

export default CheckoutForm;
