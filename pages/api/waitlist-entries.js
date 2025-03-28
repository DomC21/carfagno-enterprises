import { connectToDatabase, isMongoDBConnected } from './lib/mongoose';
import WaitlistEntryModel from './models/WaitlistEntry';

// Fallback in-memory storage when MongoDB is not available
const mockWaitlistEntries = [];

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to connect to MongoDB
    const mongoose = await connectToDatabase();
    
    // If MongoDB is connected, use it as primary storage
    if (mongoose && isMongoDBConnected()) {
      try {
        // Retrieve all waitlist entries from MongoDB
        const entries = await WaitlistEntryModel.find({})
          .sort({ createdAt: -1 }) // Sort by creation date, newest first
          .limit(100); // Limit to 100 entries for performance
        
        return res.status(200).json({ 
          success: true, 
          entries: entries.map(entry => entry.toObject()),
          count: entries.length,
          storage: 'mongodb'
        });
      } catch (mongoError) {
        console.error('MongoDB operation error:', mongoError);
        // Fall through to fallback storage if MongoDB operation fails
      }
    }
    
    // Fallback to in-memory storage if MongoDB is not available or operation failed
    console.log('=> Using fallback in-memory storage for waitlist entries');
    
    return res.status(200).json({ 
      success: true, 
      entries: mockWaitlistEntries,
      count: mockWaitlistEntries.length,
      storage: 'in-memory'
    });
  } catch (error) {
    console.error('Waitlist entries retrieval error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong retrieving waitlist entries',
      message: error.message
    });
  }
}
