import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDbConnection() {
  try {
    // Check if Prisma can connect to MongoDB and fetch some data
    const products = await prisma.product.findMany();
    console.log('Products fetched successfully:', products);
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDbConnection();
