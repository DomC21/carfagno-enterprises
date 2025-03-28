// Test MongoDB connection with URL-encoded password
import { MongoClient } from 'mongodb';

// URL encode the password to handle special characters
const username = 'domcarfagno';
const password = encodeURIComponent('BullishonNvda1');
const cluster = 'cluster0.psz9e.mongodb.net';
const dbName = 'waitlist';

// Try both connection string formats
const uri1 = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0`;
const uri2 = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Testing MongoDB connection with encoded password...');
console.log(`Using URI (without database): ${uri1.replace(password, '****')}`);
console.log(`Using URI (with database): ${uri2.replace(password, '****')}`);

// Test first connection string format
async function testConnection1() {
  const client = new MongoClient(uri1, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });
  
  try {
    console.log('\nTesting connection without database in URI...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db(dbName);
    console.log(`Connected to database: ${db.databaseName}`);
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Test second connection string format
async function testConnection2() {
  const client = new MongoClient(uri2, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });
  
  try {
    console.log('\nTesting connection with database in URI...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db();
    console.log(`Connected to database: ${db.databaseName}`);
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Run both tests
async function runTests() {
  const result1 = await testConnection1();
  const result2 = await testConnection2();
  
  console.log('\nTest Results:');
  console.log(`Connection without database in URI: ${result1 ? 'Success' : 'Failed'}`);
  console.log(`Connection with database in URI: ${result2 ? 'Success' : 'Failed'}`);
  
  if (!result1 && !result2) {
    console.log('\nTroubleshooting tips:');
    console.log('1. Verify the username and password are correct');
    console.log('2. Check if the cluster is fully provisioned');
    console.log('3. Ensure network access is configured to allow connections from anywhere (0.0.0.0/0)');
    console.log('4. Try creating a new database user with a simple password');
  }
}

runTests().catch(console.error);
