// API endpoint to check database connection status
import { connectToDatabase } from './lib/mongodb';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to connect to MongoDB
    const { client, db } = await connectToDatabase();
    
    // Get database stats
    const stats = await db.stats();
    
    // Return success response with database stats
    return res.status(200).json({
      status: 'connected',
      database: db.databaseName,
      collections: stats.collections,
      documents: stats.objects,
      storage: 'mongodb'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Return fallback response
    return res.status(200).json({
      status: 'disconnected',
      error: error.message,
      storage: 'mock',
      message: 'Using fallback in-memory storage'
    });
  }
}
