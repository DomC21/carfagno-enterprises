# MongoDB Connection String for Waitlist Database

This document provides the connection string format for the MongoDB Atlas waitlist database.

## Connection String Format

```
mongodb+srv://<username>:<password>@waitlist-cluster.mongodb.net/waitlist?retryWrites=true&w=majority
```

Replace:
- `<username>` with your MongoDB Atlas database user (e.g., waitlist-admin)
- `<password>` with your database user's password

## Environment Variables

The connection string should be stored in environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@waitlist-cluster.mongodb.net/waitlist?retryWrites=true&w=majority
MONGODB_DB=waitlist
```

## Security Notes

- Never commit the actual connection string with credentials to the repository
- Always use environment variables to store sensitive information
- For local development, use `.env.local` which is gitignored
- For production, set environment variables in the Vercel dashboard

## Fallback Mechanism

The application is designed to work even without MongoDB connection:
- If MongoDB is not available, it will fall back to in-memory storage
- This ensures the application remains functional during development or if there are database connection issues
