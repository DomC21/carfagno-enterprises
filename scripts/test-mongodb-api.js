import { MongoClient } from 'mongodb';

const username = 'Devin';
const password = 'Devin';
const cluster = 'cluster0.psz9e.mongodb.net';
const dbName = 'waitlist';

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

async function testMongoDBConnection() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
  });
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db(dbName);
    console.log(`Connected to database: ${db.databaseName}`);
    
    // Test operations
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check if waitlistentries collection exists
    const waitlistCollection = collections.find(c => c.name === 'waitlistentries');
    if (waitlistCollection) {
      const count = await db.collection('waitlistentries').countDocuments();
      console.log(`Waitlist entries count: ${count}`);
    } else {
      console.log('Waitlist collection does not exist yet');
    }
    
    return true;
  } catch (error) {
    console.error(`❌ MongoDB operation failed: ${error.message}`);
    return false;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

testMongoDBConnection().catch(console.error);
