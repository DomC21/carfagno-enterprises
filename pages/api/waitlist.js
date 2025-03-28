import { connectToDatabase, isMongoDBConnected } from './lib/mongoose';
import WaitlistEntryModel from './models/WaitlistEntry';

// Fallback in-memory storage when MongoDB is not available
const mockWaitlistEntries = [];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phoneNumber, preferredPlan } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Try to connect to MongoDB
    const mongoose = await connectToDatabase();
    
    // If MongoDB is connected, use it as primary storage
    if (mongoose && isMongoDBConnected()) {
      try {
        // Check if email already exists
        const existingEntry = await WaitlistEntryModel.findOne({ email });
        if (existingEntry) {
          return res.status(409).json({ 
            error: 'Email already registered on the waitlist',
            entry: existingEntry,
            storage: 'mongodb'
          });
        }
        
        // Create new waitlist entry
        const entry = new WaitlistEntryModel({
          name,
          email,
          phoneNumber: phoneNumber || '',
          preferredPlan: preferredPlan || 'basic',
          createdAt: new Date()
        });
        
        // Save to MongoDB
        await entry.save();
        
        return res.status(200).json({ 
          success: true, 
          message: 'Successfully added to waitlist',
          entry: entry.toObject(),
          storage: 'mongodb'
        });
      } catch (mongoError) {
        console.error('MongoDB operation error:', mongoError);
        // Fall through to fallback storage if MongoDB operation fails
      }
    }
    
    // Fallback to in-memory storage if MongoDB is not available or operation failed
    console.log('=> Using fallback in-memory storage for waitlist entry');
    
    // Check if email already exists in mock storage
    const existingMockEntry = mockWaitlistEntries.find(entry => entry.email === email);
    if (existingMockEntry) {
      return res.status(409).json({ 
        error: 'Email already registered on the waitlist',
        entry: existingMockEntry,
        storage: 'in-memory'
      });
    }
    
    // Create new entry for mock storage
    const mockEntry = {
      name,
      email,
      phoneNumber: phoneNumber || '',
      preferredPlan: preferredPlan || 'basic',
      createdAt: new Date()
    };
    
    // Add to mock storage
    mockWaitlistEntries.push(mockEntry);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist (using fallback storage)',
      entry: mockEntry,
      storage: 'in-memory'
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong processing your request',
      message: error.message
    });
  }
}
