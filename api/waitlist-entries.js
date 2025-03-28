// For testing without a real MongoDB connection
// import dbConnect from '../lib/mongoose';
// import WaitlistEntry from '../models/WaitlistEntry';

// Import mock database from waitlist.js
import { mockWaitlistEntries } from './waitlist';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For testing without a real MongoDB connection
    // await dbConnect();
    
    // Return mock entries, sorted by creation date (newest first)
    const entries = [...mockWaitlistEntries].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return res.status(200).json({ entries });
  } catch (error) {
    console.error('Error retrieving waitlist entries:', error);
    return res.status(500).json({ error: 'Failed to retrieve waitlist entries' });
  }
}
