// For testing without a real MongoDB connection
// import dbConnect from '../lib/mongoose';
// import WaitlistEntry from '../models/WaitlistEntry';

// Import mock database from waitlist.js
import { mockWaitlistEntries } from './waitlist';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For testing without a real MongoDB connection
    // await dbConnect();
    
    // Get mock waitlist entry count
    const entryCount = mockWaitlistEntries.length;
    
    // Get database stats
    const stats = {
      waitlistEntries: entryCount,
      databaseConnected: true,
      lastUpdated: new Date().toISOString(),
      mode: 'mock' // Indicate we're using mock data
    };
    
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Database status error:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve database status',
      databaseConnected: false
    });
  }
}
