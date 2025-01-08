import React from 'react';

const ConfirmationPage = () => {
  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been received and is being processed.</p>
      <p>You will receive an email confirmation shortly.</p>
      <button onClick={() => window.location.href = '/shop'}>Continue Shopping</button>
    </div>
  );
};

export default ConfirmationPage;
