import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, price, category, imageUrl } = req.body;

    // Assuming the user is an admin (this should be checked with a JWT or session in a real app)
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl,
      },
    });

    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
