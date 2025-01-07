import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token is missing" });
  }

  try {
    const secretKey = "0x4AAAAAAA4xErymuJmWQ1gU23fwv2vzadY"; // Replace with your secret key
    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const result = await verificationResponse.json();
    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Token verification failed" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
