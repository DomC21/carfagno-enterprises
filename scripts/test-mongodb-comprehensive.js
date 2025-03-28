// Comprehensive MongoDB connection test script
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Test configurations
const configs = [
  {
    name: 'Standard connection string',
    uri: 'mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0'
  },
  {
    name: 'URL-encoded password',
    uri: `mongodb+srv://domcarfagno:${encodeURIComponent('BullishonNvda1')}@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0`
  },
  {
    name: 'Admin database',
    uri: 'mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/admin?retryWrites=true&w=majority&appName=Cluster0'
  },
  {
    name: 'No database specified',
    uri: 'mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  }
];

// Connection options
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000
};

// Test MongoDB connection with native driver
async function testNativeDriver(config) {
  console.log(`\nTesting with native MongoDB driver: ${config.name}`);
  console.log(`URI: ${config.uri.replace(/domcarfagno:([^@]+)/, 'domcarfagno:****')}`);
  
  const client = new MongoClient(config.uri, options);
  
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Successfully connected!');
    
    // Get connection status
    console.log('Connection successful');
    
    return true;
  } catch (error) {
    console.error(`❌ Connection failed: ${error.message}`);
    return false;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Test MongoDB connection with mongoose
async function testMongoose(config) {
  console.log(`\nTesting with Mongoose: ${config.name}`);
  console.log(`URI: ${config.uri.replace(/domcarfagno:([^@]+)/, 'domcarfagno:****')}`);
  
  try {
    console.log('Connecting...');
    await mongoose.connect(config.uri, options);
    console.log('✅ Successfully connected!');
    
    // Get connection status
    console.log(`Connection status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Connection failed: ${error.message}`);
    return false;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('Connection closed');
    }
  }
}

// Run all tests
async function runTests() {
  console.log('=== COMPREHENSIVE MONGODB CONNECTION TESTS ===');
  console.log('Testing multiple connection approaches to diagnose issues\n');
  
  const results = {
    native: {},
    mongoose: {}
  };
  
  // Test each configuration with native driver
  for (const config of configs) {
    results.native[config.name] = await testNativeDriver(config);
  }
  
  // Test each configuration with mongoose
  for (const config of configs) {
    results.mongoose[config.name] = await testMongoose(config);
  }
  
  // Print summary
  console.log('\n=== TEST RESULTS SUMMARY ===');
  console.log('Native MongoDB Driver:');
  for (const [name, result] of Object.entries(results.native)) {
    console.log(`  ${name}: ${result ? '✅ Success' : '❌ Failed'}`);
  }
  
  console.log('\nMongoose:');
  for (const [name, result] of Object.entries(results.mongoose)) {
    console.log(`  ${name}: ${result ? '✅ Success' : '❌ Failed'}`);
  }
  
  // Check if any tests passed
  const anySuccess = Object.values(results.native).some(r => r) || 
                     Object.values(results.mongoose).some(r => r);
  
  if (!anySuccess) {
    console.log('\n❌ All connection attempts failed.');
    console.log('\nTroubleshooting recommendations:');
    console.log('1. Verify the MongoDB Atlas cluster is fully provisioned (can take 5-10 minutes)');
    console.log('2. Check if the database user "domcarfagno" exists and has the correct password');
    console.log('3. Ensure network access is configured to allow connections from anywhere (0.0.0.0/0)');
    console.log('4. Try creating a new database user with a simpler password (no special characters)');
    console.log('5. Check if the MongoDB Atlas free tier has any connection limitations');
  } else {
    console.log('\n✅ At least one connection method succeeded!');
    console.log('Use the successful connection approach in your application.');
  }
}

// Run the tests
runTests().catch(console.error);
