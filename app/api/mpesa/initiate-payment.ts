import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, initiateSTKPush } from './mpesa';  // Import the mpesa functions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, amount } = req.body;

    try {
      const accessToken = await getAccessToken();  // Get the access token
      const paymentResponse = await initiateSTKPush(accessToken, phoneNumber, amount);  // Initiate the STK Push

      if (paymentResponse.ResponseCode === '0') {
        res.status(200).json({
          StatusCode: 0,
          Message: 'Payment initiated successfully',
        });
      } else {
        res.status(500).json({ StatusCode: 1, Message: 'Failed to initiate payment' });
      }
    } catch (error) {
      res.status(500).json({ StatusCode: 1, Message: error.message });
    }
  } else {
    res.status(405).json({ StatusCode: 1, Message: 'Method not allowed' });
  }
}
