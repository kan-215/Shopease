// /lib/db.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db: any;

const connectToDatabase = async () => {
  if (db) return db;

  await client.connect();
  db = client.db();
  return db;
};

export default connectToDatabase;
