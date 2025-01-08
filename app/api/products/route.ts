import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  discount: Number,
  inStock: Boolean,
});

// Create the Product model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// Connect to the database
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

// API route to get all products
export async function GET() {
  await connectToDatabase();
// Get products from Mongo DB
  const products = await Product.find();
  return NextResponse.json(products);
}
