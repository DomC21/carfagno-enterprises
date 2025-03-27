// For testing without a real MongoDB connection
// import dbConnect from '../lib/mongoose';
// import WaitlistEntry from '../models/WaitlistEntry';

// Mock database for testing
export const mockWaitlistEntries = [];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For testing without a real MongoDB connection
    // await dbConnect();
    
    const { name, email, phoneNumber, preferredPlan } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check for duplicate email (mock implementation)
    const existingEntry = mockWaitlistEntries.find(entry => entry.email === email);
    if (existingEntry) {
      return res.status(400).json({ 
        error: 'This email is already on the waitlist' 
      });
    }

    // Create waitlist entry
    const entry = {
      id: Date.now().toString(),
      name,
      email,
      phoneNumber: phoneNumber || '',
      preferredPlan: preferredPlan || 'basic',
      createdAt: new Date().toISOString()
    };

    // Save to mock database
    mockWaitlistEntries.push(entry);
    console.log('New waitlist entry saved to mock database:', entry);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      entry
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'This email is already on the waitlist' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Something went wrong processing your request' 
    });
  }
}
