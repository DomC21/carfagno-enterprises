import { connectToDatabase, getDatabaseStats, isMongoDBConnected } from './lib/mongoose';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to connect to MongoDB
    const mongoose = await connectToDatabase();
    
    // If MongoDB is connected, return database stats
    if (mongoose && isMongoDBConnected()) {
      const stats = await getDatabaseStats();
      return res.status(200).json(stats);
    }
    
    // If MongoDB is not connected, return fallback status
    return res.status(200).json({ 
      connected: false,
      message: 'MongoDB is not connected, using fallback in-memory storage',
      storage: 'in-memory'
    });
  } catch (error) {
    console.error('Database status error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong checking database status',
      message: error.message
    });
  }
}
