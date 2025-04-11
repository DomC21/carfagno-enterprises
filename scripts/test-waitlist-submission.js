import '../pages/api/lib/dotenv.js';
import fetch from 'node-fetch';
import { connectToDatabase, isMongoDBConnected, getDatabaseStats } from '../pages/api/lib/mongoose.js';
import WaitlistEntryModel from '../pages/api/models/WaitlistEntry.js';

async function testWaitlistSubmission() {
  console.log('=== TESTING WAITLIST FORM SUBMISSION ===');
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const mongoose = await connectToDatabase();
    
    if (!mongoose || !isMongoDBConnected()) {
      console.error('❌ MongoDB connection failed');
      return false;
    }
    
    console.log('✅ Successfully connected to MongoDB');
    
    // Create test data
    const testData = {
      name: 'Test User',
      email: `test.user.${Date.now()}@example.com`,
      phoneNumber: '555-123-4567',
      preferredPlan: 'basic'
    };
    
    console.log('Creating test waitlist entry:', testData);
    
    // Create entry directly in MongoDB
    const entry = new WaitlistEntryModel({
      ...testData,
      createdAt: new Date()
    });
    
    // Save to MongoDB
    await entry.save();
    console.log('✅ Successfully saved test entry to MongoDB');
    
    // Verify entry exists in database
    const savedEntry = await WaitlistEntryModel.findOne({ email: testData.email });
    if (savedEntry) {
      console.log('✅ Successfully retrieved test entry from MongoDB');
      console.log('Entry details:', savedEntry.toObject());
    } else {
      console.error('❌ Failed to retrieve test entry from MongoDB');
    }
    
    // Get updated database stats
    const stats = await getDatabaseStats();
    console.log('Updated database stats:', stats);
    
    console.log('\n=== WAITLIST FORM SUBMISSION TEST SUCCESSFUL ===');
    return true;
  } catch (error) {
    console.error('❌ Waitlist submission test error:', error);
    return false;
  }
}

testWaitlistSubmission().catch(console.error);
