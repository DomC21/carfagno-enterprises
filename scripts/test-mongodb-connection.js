import '../pages/api/lib/dotenv.js';
import { connectToDatabase, isMongoDBConnected, getDatabaseStats } from '../pages/api/lib/mongoose.js';

async function testMongoDBConnection() {
  console.log('=== TESTING MONGODB CONNECTION WITH DOTENV LOADER ===');
  
  try {
    console.log('Connecting to MongoDB...');
    const mongoose = await connectToDatabase();
    
    if (mongoose && isMongoDBConnected()) {
      console.log('✅ Successfully connected to MongoDB');
      
      const stats = await getDatabaseStats();
      console.log('Database stats:', stats);
      
      console.log('\n=== MONGODB CONNECTION TEST SUCCESSFUL ===');
      return true;
    } else {
      console.error('❌ MongoDB connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
}

testMongoDBConnection().catch(console.error);
