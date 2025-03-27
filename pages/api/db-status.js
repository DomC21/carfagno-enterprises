// Import mock database and MongoDB initialization from waitlist.js
import { mockWaitlistEntries, initMongoDB } from './waitlist';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize MongoDB if available
    const mongoAvailable = await initMongoDB();
    
    if (mongoAvailable) {
      // Use MongoDB for status
      try {
        const mongoose = (await import('mongoose')).default;
        const WaitlistEntry = mongoose.model('WaitlistEntry');
        
        // Get waitlist entry count from MongoDB
        const entryCount = await WaitlistEntry.countDocuments();
        
        // Get database stats
        const stats = {
          waitlistEntries: entryCount,
          databaseConnected: true,
          lastUpdated: new Date().toISOString(),
          mode: 'mongodb',
          mongodbUri: process.env.MONGODB_URI ? 'configured' : 'not configured'
        };
        
        return res.status(200).json(stats);
      } catch (error) {
        console.error('MongoDB status error:', error);
        throw error; // Re-throw to be caught by outer try/catch
      }
    } else {
      // Fallback to mock database
      console.log('MongoDB not available, using mock database for status');
      
      // Get mock waitlist entry count
      const entryCount = mockWaitlistEntries.length;
      
      // Get database stats
      const stats = {
        waitlistEntries: entryCount,
        databaseConnected: true,
        lastUpdated: new Date().toISOString(),
        mode: 'mock', // Indicate we're using mock data
        mongodbUri: process.env.MONGODB_URI ? 'configured' : 'not configured'
      };
      
      return res.status(200).json(stats);
    }
  } catch (error) {
    console.error('Database status error:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve database status',
      databaseConnected: false,
      mode: 'error'
    });
  }
}
