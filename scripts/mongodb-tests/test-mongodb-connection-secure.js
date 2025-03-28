// Test script for MongoDB connection without hardcoded credentials
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Get MongoDB connection details from environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'waitlist';

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is not set');
  process.exit(1);
}

// Test MongoDB connection
async function testMongoDBConnection() {
  console.log('=== TESTING MONGODB CONNECTION ===');
  const client = new MongoClient(MONGODB_URI);
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    const db = client.db(MONGODB_DB);
    
    // List collections
    console.log('\nListing collections...');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Test waitlist collection
    const waitlistCollection = db.collection('waitlistentries');
    
    // Create test entry
    console.log('\nCreating test entry...');
    const testEntry = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phoneNumber: '555-TEST',
      preferredPlan: 'basic',
      createdAt: new Date()
    };
    
    // Insert test entry
    const insertResult = await waitlistCollection.insertOne(testEntry);
    console.log(`✅ Test entry created with ID: ${insertResult.insertedId}`);
    
    // Retrieve test entry
    console.log('\nRetrieving test entry...');
    const retrievedEntry = await waitlistCollection.findOne({ email: testEntry.email });
    console.log('✅ Retrieved test entry');
    
    // Clean up test entry
    console.log('\nCleaning up test data...');
    const deleteResult = await waitlistCollection.deleteOne({ email: testEntry.email });
    console.log(`✅ Deleted ${deleteResult.deletedCount} test entries`);
    
    console.log('\n=== MONGODB CONNECTION TEST SUCCESSFUL ===');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the test
testMongoDBConnection().catch(console.error);
