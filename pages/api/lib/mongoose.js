import mongoose from 'mongoose';
import '../lib/dotenv.js';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'waitlist';

// Connection state tracking
let isConnected = false;

const isVercelBuild = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production' && process.env.NEXT_PHASE === 'build';

/**
 * Connect to MongoDB using mongoose
 * @returns {Promise<typeof mongoose>} Mongoose instance
 */
export async function connectToDatabase() {
  if (isVercelBuild) {
    console.log('=> Skipping MongoDB connection during Vercel build phase');
    return null;
  }

  if (isConnected) {
    console.log('=> Using existing mongoose connection');
    return mongoose;
  }

  if (!MONGODB_URI) {
    console.warn('=> No MONGODB_URI provided, using mock database');
    return null;
  }

  try {
    console.log('=> Connecting to MongoDB...');
    
    // Configure mongoose connection options
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
      // These options help with connection stability
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      console.log('=> Connected to MongoDB successfully');
      
      // Set up connection error handler
      mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
        isConnected = false;
      });
      
      // Handle disconnection
      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
        isConnected = false;
      });
      
      return mongoose;
    } else {
      throw new Error(`MongoDB connection failed, readyState: ${mongoose.connection.readyState}`);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    return null;
  }
}

/**
 * Check if MongoDB is connected
 * @returns {boolean} Connection status
 */
export function isMongoDBConnected() {
  return isConnected;
}

/**
 * Get database stats
 * @returns {Promise<Object>} Database stats
 */
export async function getDatabaseStats() {
  if (!isConnected) {
    return { connected: false };
  }
  
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get count of waitlist entries if that collection exists
    let entryCount = 0;
    if (collectionNames.includes('waitlistentries')) {
      entryCount = await mongoose.connection.db.collection('waitlistentries').countDocuments();
    }
    
    return {
      connected: true,
      database: MONGODB_DB,
      collections: collectionNames,
      entryCount
    };
  } catch (error) {
    console.error(`Error getting database stats: ${error.message}`);
    return { 
      connected: true,
      error: 'Failed to get database stats'
    };
  }
}
