// /app/api/payment/route.ts

import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const consumerKey = 'bPl0oxG15MwATtZNA6uIia9lLbCCppp30QAFSuVJ9MLztHrP';  // Replace with your consumer key
const consumerSecret = '9JbrXZyAcTZY12Rq3r8fuAS2H3Yvq3jte9O7ZQZnEsXgfxR3kwovfQwHjjTQg6gE';  // Replace with your consumer secret
const lipaNaMpesaOnlineShortcode = '174379'; // Your shortcode
const lipaNaMpesaOnlineShortcodePassword = 'password'; // Replace with your shortcode password

export async function POST(req: Request) {
  const body = await req.json();

  const phoneNumber = body.phoneNumber;
  const amount = body.amount;

  try {
    // Step 1: Generate an Access Token
    const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');

    const authResponse = await fetch('https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        'Authorization': auth
      }
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      return NextResponse.json({
        status: 'failure',
        message: 'Failed to retrieve access token',
      });
    }

    // Step 2: Initiate the STK Push
    const stkPushPayload = {
      BusinessShortcode: lipaNaMpesaOnlineShortcode,
      LipaNaMpesaOnlineShortcodePassword: lipaNaMpesaOnlineShortcodePassword,
      PhoneNumber: phoneNumber, // Phone number from user
      Amount: amount, // Amount user wants to pay
      AccountReference: 'Test123',
      TransactionDesc: 'Payment for test order',
      CallBackURL: 'https://yourdomain.com/api/payment/callback' // Callback URL for payment response
    };

    const stkPushResponse = await fetch('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload)
    });

    const stkPushData = await stkPushResponse.json();

    if (stkPushData.ResponseCode === '0') {
      return NextResponse.json({
        status: 'success',
        message: 'Payment initiated successfully',
        checkoutRequestId: stkPushData.CheckoutRequestID,
      });
    } else {
      return NextResponse.json({
        status: 'failure',
        message: 'Payment initiation failed',
        error: stkPushData.ErrorMessage,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while processing the payment',
      error: error.message,
    });
  }
}
