// Final test script to verify MongoDB Atlas connection
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Loaded environment variables from .env.local');
} else {
  console.log('No .env.local file found, using process.env');
  dotenv.config();
}

// Get connection string from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'waitlist';

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is not set');
  process.exit(1);
}

console.log('Testing MongoDB Atlas connection...');
console.log(`Using URI: ${uri.replace(/domcarfagno:([^@]+)/, 'domcarfagno:****')}`);
console.log(`Database name: ${dbName}`);

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Get connection status
    console.log(`Connection status: Connected`);
    
    // List databases
    console.log('Listing databases:');
    const databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => {
      console.log(` - ${db.name}`);
    });
    
    // Connect to the waitlist database
    const database = client.db(dbName);
    console.log(`Connected to database: ${database.databaseName}`);
    
    // List collections in the waitlist database
    console.log(`Listing collections in ${dbName} database:`);
    const collections = await database.listCollections().toArray();
    if (collections.length === 0) {
      console.log('  No collections found (empty database)');
    } else {
      collections.forEach(collection => {
        console.log(` - ${collection.name}`);
      });
    }
    
    // Create a test collection if it doesn't exist
    if (collections.length === 0) {
      console.log('Creating a test collection...');
      await database.createCollection('test_collection');
      console.log('Test collection created successfully');
    }
    
    console.log('MongoDB Atlas connection test completed successfully!');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB Atlas:', err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('Connection closed');
  }
}

run().catch(console.error);
