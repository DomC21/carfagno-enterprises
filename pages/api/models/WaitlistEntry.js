import mongoose from 'mongoose';

const WaitlistEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: ''
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

const WaitlistEntryModel = mongoose.models.WaitlistEntry || mongoose.model('WaitlistEntry', WaitlistEntrySchema);

export default WaitlistEntryModel;
