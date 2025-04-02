// MongoDB connection utility
import { MongoClient } from 'mongodb';

// Connection string from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'waitlist';

// Connection cache
let cachedClient = null;
let cachedDb = null;

// Connect to MongoDB
export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Check if MongoDB URI is configured
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // Create a new MongoDB client
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Get the database
    const db = client.db(dbName);

    // Cache the client and db connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
