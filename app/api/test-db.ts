import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    // Test by fetching collections
    const collections = await db.listCollections().toArray();
    res.status(200).json({ message: "Connection successful!", collections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Connection failed!", error: error.message });
  }
}
