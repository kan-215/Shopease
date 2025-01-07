// /pages/api/orders/[userId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import Order from "../../../models/Order"; // Assuming you have an Order model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    // Connect to the database
    const db = await connectToDatabase();
    const orders = await db.collection("orders").find({ userId }).toArray();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
}
