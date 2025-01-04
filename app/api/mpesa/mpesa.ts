import fetch from 'node-fetch';

// Function to get access token from Safaricom API using your Consumer Key and Secret
export async function getAccessToken(): Promise<string> {
  const url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  // Safaricom requires the Authorization header with the Base64 encoded Consumer Key and Secret
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('bPl0oxG15MwATtZNA6uIia9lLbCCppp30QAFSuVJ9MLztHrP' + ':' + '9JbrXZyAcTZY12Rq3r8fuAS2H3Yvq3jte9O7ZQZnEsXgfxR3kwovfQwHjjTQg6gE').toString('base64'),
    },
  });

  const data = await response.json();
  return data.access_token;  // Return the access token
}

// Function to initiate the STK push
export async function initiateSTKPush(accessToken: string, phoneNumber: string, amount: number): Promise<any> {
  const url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const body = {
    BusinessShortcode: 'YOUR_SHORTCODE',  // Your M-Pesa Shortcode
    LipaNaMpesaOnlineShortcodePassword: 'YOUR_SHORTCODE_PASSWORD',  // Your password for the shortcode
    PhoneNumber: phoneNumber,  // Customer's phone number (international format)
    Amount: amount,  // Amount you want to charge the customer
    PartyA: phoneNumber,  // Customer's phone number (PartyA)
    PartyB: 'YOUR_SHORTCODE',  // Your business shortcode (PartyB)
    AccountReference: 'Order12345',  // Order reference
    TransactionDesc: 'Payment for Order 12345',  // Transaction description
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;  // Return the response from the M-Pesa API
}
