// pages/api/orders.ts
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Order from "../../models/Order";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await mongoose.connect(process.env.MONGODB_URI);

      const { productName, shippingAddress, price, userId } = req.body;

      // Create a new order
      const newOrder = new Order({
        userId,
        productName,
        shippingAddress,
        price,
      });

      // Save the order to the database
      await newOrder.save();

      // Optionally, update the user with the new order (if needed)
      await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });

      return res.status(200).json({ message: "Order saved successfully", order: newOrder });
    } catch (error) {
      return res.status(500).json({ message: "Error saving order", error });
    }
  }
}
