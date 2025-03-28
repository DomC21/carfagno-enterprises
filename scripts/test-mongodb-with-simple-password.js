// Test MongoDB connection with a simpler password
import { MongoClient } from 'mongodb';

// Create a new database user with a simple password for testing
console.log('Testing MongoDB connection with a simple password approach...');
console.log('Note: This script assumes you have created a new database user with a simple password');

// Connection string with a simple password (no special characters)
// Replace these values with your actual test user credentials
const testUsername = 'testuser';
const testPassword = 'password123';
const cluster = 'cluster0.psz9e.mongodb.net';
const dbName = 'waitlist';

const uri = `mongodb+srv://${testUsername}:${testPassword}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(`Using URI: ${uri.replace(testPassword, '****')}`);

// Test connection
async function testConnection() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });
  
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db(dbName);
    console.log(`Connected to database: ${db.databaseName}`);
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\nThis suggests the test user credentials are incorrect or the user does not exist.');
      console.log('Please create a new database user with the following steps:');
      console.log('1. Go to MongoDB Atlas dashboard');
      console.log('2. Navigate to "Database Access"');
      console.log('3. Click "Add New Database User"');
      console.log('4. Use Authentication Method: Password');
      console.log('5. Enter a simple username and password (no special characters)');
      console.log('6. Set privileges to "Read and write to any database"');
      console.log('7. Click "Add User"');
    }
    
    return false;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Run the test
testConnection().catch(console.error);
