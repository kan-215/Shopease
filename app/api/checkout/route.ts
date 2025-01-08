// Example of handling the checkout process
const handleCheckout = async () => {
    // Perform checkout logic, like saving the order to the database
    const orderData = {
      productName: "Example Product",
      shippingAddress: "1234 Street, City, Country",
      price: 1000, // Example price
      date: new Date().toLocaleDateString(),
    };
  
    // Save order data to the database or session
    // You can call an API to save the data, or save it to session directly
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      // Handle successful checkout
      console.log("Order saved successfully");
    } else {
      console.error("Failed to save order");
    }
  };
  