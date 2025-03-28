// Script to create a test user in the waitlist database
import { MongoClient } from 'mongodb';

// Connection string with admin credentials
const adminUri = 'mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/admin?retryWrites=true&w=majority&appName=Cluster0';

// New test user credentials
const testUsername = 'testuser';
const testPassword = 'password123';

async function createTestUser() {
  console.log('Attempting to create a test user in MongoDB Atlas...');
  
  const client = new MongoClient(adminUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });
  
  try {
    console.log('Connecting to MongoDB Atlas with admin credentials...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Get the admin database
    const adminDb = client.db('admin');
    
    // Create the test user
    console.log(`Creating user: ${testUsername}`);
    await adminDb.command({
      createUser: testUsername,
      pwd: testPassword,
      roles: [
        { role: 'readWrite', db: 'waitlist' }
      ]
    });
    
    console.log(`✅ Successfully created user: ${testUsername}`);
    console.log('You can now use this user to test the MongoDB connection');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to create test user:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\nAuthentication failed. This suggests:');
      console.log('1. The admin credentials are incorrect');
      console.log('2. The admin user does not have sufficient privileges');
      console.log('3. The cluster is still being provisioned');
    } else if (error.message.includes('already exists')) {
      console.log(`\nUser ${testUsername} already exists. You can use it for testing.`);
    }
    
    return false;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
createTestUser().catch(console.error);
