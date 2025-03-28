// Import mock database from waitlist.js
import { mockWaitlistEntries, initMongoDB } from './waitlist';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize MongoDB if available
    const mongoAvailable = await initMongoDB();
    
    if (mongoAvailable) {
      // Use MongoDB for retrieval
      try {
        const dbConnect = (await import('../lib/mongoose')).default;
        const WaitlistEntry = (await import('../models/WaitlistEntry')).default;
        
        await dbConnect();
        
        // Retrieve all entries, sorted by creation date (newest first)
        const entries = await WaitlistEntry.find({})
          .sort({ createdAt: -1 })
          .lean();
        
        return res.status(200).json({ 
          entries,
          storage: 'mongodb'
        });
      } catch (error) {
        console.error('MongoDB retrieval error:', error);
        throw error; // Re-throw to be caught by outer try/catch
      }
    } else {
      // Fallback to mock database
      console.log('MongoDB not available, using mock database for retrieval');
      
      // Return mock entries, sorted by creation date (newest first)
      const entries = [...mockWaitlistEntries].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      return res.status(200).json({ 
        entries,
        storage: 'mock'
      });
    }
  } catch (error) {
    console.error('Error retrieving waitlist entries:', error);
    return res.status(500).json({ error: 'Failed to retrieve waitlist entries' });
  }
}
