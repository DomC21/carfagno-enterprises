# MongoDB Fallback Mechanism

This document explains the fallback mechanism implemented for the Carfagno Enterprises waitlist system when MongoDB is not available.

## Overview

The waitlist system is designed to work even without a MongoDB connection. This ensures that:

1. The application remains functional during development
2. Users can still join the waitlist if there are temporary database connection issues
3. The application can be deployed without MongoDB configuration for testing purposes

## How It Works

### API Routes

All API routes (`/pages/api/waitlist.js` and `/pages/api/waitlist-entries.js`) implement a fallback mechanism:

1. First, they attempt to connect to MongoDB using the connection string in environment variables
2. If the connection succeeds, they use MongoDB for data storage and retrieval
3. If the connection fails, they automatically fall back to in-memory storage

### In-Memory Storage

When MongoDB is not available, the system uses an in-memory array to store waitlist entries:

```javascript
// Mock database for testing when MongoDB is not available
export const mockWaitlistEntries = [];
```

This array persists for the lifetime of the server process but will be reset when the server restarts.

### Connection Detection

The system detects whether MongoDB is available using the `initMongoDB()` function:

```javascript
export async function initMongoDB() {
  // Check if MongoDB URI is configured
  if (process.env.MONGODB_URI && process.env.MONGODB_URI !== '') {
    try {
      // Connect to MongoDB
      // ...
      return true;
    } catch (error) {
      console.error('Failed to initialize MongoDB:', error);
      return false;
    }
  }
  return false;
}
```

### Response Indication

API responses include an indication of which storage mechanism was used:

```javascript
return res.status(200).json({ 
  success: true, 
  message: 'Successfully added to waitlist',
  entry,
  storage: 'mock' // or 'mongodb'
});
```

## Benefits

This fallback mechanism provides several benefits:

1. **Development Flexibility**: Developers can work on the application without setting up MongoDB
2. **Resilience**: The application continues to function even if the database is temporarily unavailable
3. **Testing**: Easier testing of the application without database dependencies
4. **Gradual Deployment**: The application can be deployed first, and the database can be configured later

## Limitations

The in-memory storage has some limitations:

1. **Data Persistence**: Data is lost when the server restarts
2. **Scalability**: Not suitable for production use with multiple server instances
3. **Features**: Advanced database features like indexing and transactions are not available

## Recommended Usage

- **Development**: Use the fallback mechanism for rapid development
- **Testing**: Use the fallback for initial testing and MongoDB for integration testing
- **Production**: Always use MongoDB for production deployments
