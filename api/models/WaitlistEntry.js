const mongoose = require('mongoose');

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

module.exports = mongoose.models.WaitlistEntry || mongoose.model('WaitlistEntry', waitlistSchema);
