// Mock database for testing when MongoDB is not available
export const mockWaitlistEntries = [];

// Initialize MongoDB if available
export async function initMongoDB() {
  // Check if MongoDB URI is configured
  if (process.env.MONGODB_URI && process.env.MONGODB_URI !== '') {
    try {
      // Dynamic imports to avoid build errors
      const mongoose = (await import('mongoose')).default;
      
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGODB_URI);
      
      // Load the WaitlistEntry model
      if (!mongoose.models.WaitlistEntry) {
        const waitlistSchema = new mongoose.Schema({
          name: { 
            type: String, 
            required: true,
            trim: true
          },
          email: { 
            type: String, 
            required: true,
            trim: true,
            lowercase: true,
            unique: true
          },
          phoneNumber: { 
            type: String, 
            default: '',
            trim: true
          },
          preferredPlan: { 
            type: String, 
            enum: ['basic', 'pro', 'enterprise'],
            default: 'basic'
          },
          createdAt: { 
            type: Date, 
            default: Date.now 
          }
        });
        
        // Create a text index on name and email for search functionality
        waitlistSchema.index({ name: 'text', email: 'text' });
        
        // Register the model
        mongoose.model('WaitlistEntry', waitlistSchema);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize MongoDB:', error);
      return false;
    }
  }
  return false;
}

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

    // Initialize MongoDB if available
    const mongoAvailable = await initMongoDB();
    
    if (mongoAvailable) {
      // Use MongoDB for storage
      try {
        const mongoose = (await import('mongoose')).default;
        const WaitlistEntry = mongoose.model('WaitlistEntry');
        
        // Create new waitlist entry
        const entry = new WaitlistEntry({
          name,
          email,
          phoneNumber: phoneNumber || '',
          preferredPlan: preferredPlan || 'basic'
        });
        
        // Save to MongoDB
        await entry.save();
        
        return res.status(200).json({ 
          success: true, 
          message: 'Successfully added to waitlist',
          entry
        });
      } catch (error) {
        console.error('MongoDB waitlist submission error:', error);
        
        // Handle duplicate email error
        if (error.code === 11000) {
          return res.status(400).json({ 
            error: 'This email is already on the waitlist' 
          });
        }
        
        throw error; // Re-throw to be caught by outer try/catch
      }
    } else {
      // Fallback to mock database
      console.log('MongoDB not available, using mock database');
      
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
        entry,
        storage: 'mock' // Indicate we're using mock storage
      });
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    return res.status(500).json({ 
      error: 'Something went wrong processing your request' 
    });
  }
}
