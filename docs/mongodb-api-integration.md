# MongoDB API Integration

This document provides an overview of the MongoDB API integration for the Carfagno Enterprises waitlist system.

## API Routes

The following API routes are available for the waitlist system:

- `/api/waitlist.js`: Submit a new waitlist entry
- `/api/waitlist-entries.js`: View all waitlist entries
- `/api/db-status.js`: Check database connection and stats

## MongoDB Connection

The API routes use a MongoDB connection utility located at `/api/lib/mongoose.js`. This utility:

1. Establishes a connection to MongoDB Atlas
2. Provides connection status information
3. Implements a fallback mechanism for when MongoDB is not available

## Waitlist Entry Model

The waitlist entry model is defined in `/api/models/WaitlistEntry.js` and includes the following fields:

- `name`: User's full name
- `email`: User's email address (unique)
- `phoneNumber`: User's phone number (optional)
- `preferredPlan`: User's preferred plan (basic, pro, enterprise)
- `createdAt`: Timestamp when the entry was created

## Fallback Mechanism

The API routes implement a fallback mechanism that uses in-memory storage when MongoDB is not available. This ensures the application remains functional during development or if there are database connection issues.

## Testing

The API routes have been thoroughly tested with secure test scripts that use environment variables for sensitive information. Test scripts are located in the `scripts/mongodb-tests` directory.

## Environment Variables

The MongoDB connection requires the following environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
MONGODB_DB=waitlist
```

These variables should be set in the Vercel dashboard for production and in `.env.local` for local development.

## Security Considerations

- The connection string with credentials should only be stored in environment variables
- For local development, use `.env.local` which is gitignored
- For production, set environment variables in the Vercel dashboard
- Never commit the actual connection string with credentials to the repository
