// MongoDB model for waitlist entries
import mongoose from 'mongoose';

// Define the schema if it doesn't exist
const WaitlistEntrySchema = new mongoose.Schema({
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
WaitlistEntrySchema.index({ name: 'text', email: 'text' });

// Export the model
export default mongoose.models.WaitlistEntry || mongoose.model('WaitlistEntry', WaitlistEntrySchema);
