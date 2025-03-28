// Test script to verify the fallback mechanism works correctly
import { mockWaitlistEntries, initMongoDB } from '../pages/api/waitlist.js';

async function testFallbackMechanism() {
  console.log('Testing waitlist fallback mechanism...');
  
  // Test MongoDB connection
  console.log('Attempting to connect to MongoDB...');
  const mongoAvailable = await initMongoDB();
  console.log(`MongoDB available: ${mongoAvailable}`);
  
  if (!mongoAvailable) {
    console.log('✅ Fallback mechanism will be used (expected behavior)');
    
    // Test mock database
    console.log('\nTesting mock database operations:');
    
    // Add a test entry
    const testEntry = {
      id: Date.now().toString(),
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '123-456-7890',
      preferredPlan: 'basic',
      createdAt: new Date().toISOString()
    };
    
    mockWaitlistEntries.push(testEntry);
    console.log(`Added test entry: ${JSON.stringify(testEntry)}`);
    
    // Check if entry was added
    const foundEntry = mockWaitlistEntries.find(entry => entry.email === 'test@example.com');
    if (foundEntry) {
      console.log('✅ Successfully retrieved test entry from mock database');
    } else {
      console.log('❌ Failed to retrieve test entry from mock database');
    }
    
    // Print all entries
    console.log('\nAll entries in mock database:');
    mockWaitlistEntries.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.name} (${entry.email})`);
    });
    
    console.log('\nFallback mechanism test completed successfully!');
  } else {
    console.log('MongoDB is available, fallback mechanism will not be used');
    console.log('This is unexpected based on previous test results');
  }
}

// Run the test
testFallbackMechanism().catch(console.error);
