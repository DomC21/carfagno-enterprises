# MongoDB Connection String for Waitlist Database

This document provides the connection string format for the MongoDB Atlas waitlist database.

## Connection String Format

```
mongodb+srv://domcarfagno:<password>@cluster0.psz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Replace:
- `<password>` with your MongoDB Atlas database user password

For specifying a database, you can either:
1. Add the database name in the connection string:
   ```
   mongodb+srv://domcarfagno:<password>@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0
   ```
2. Or specify the database when creating the connection:
   ```javascript
   const db = client.db('waitlist');
   ```

## Environment Variables

The connection string should be stored in environment variables:

```
MONGODB_URI=mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=waitlist
```

## Security Notes

- Never commit the actual connection string with credentials to the repository
- Always use environment variables to store sensitive information
- For local development, use `.env.local` which is gitignored
- For production, set environment variables in the Vercel dashboard

## Vercel Environment Variables

To configure MongoDB in Vercel:
1. Go to your Vercel project settings
2. Navigate to the "Environment Variables" section
3. Add the following variables:
   - `MONGODB_URI`: The full connection string with credentials
   - `MONGODB_DB`: Set to "waitlist"
4. Make sure to add these variables to all environments (Production, Preview, Development)

## Fallback Mechanism

The application is designed to work even without MongoDB connection:
- If MongoDB is not available, it will fall back to in-memory storage
- This ensures the application remains functional during development or if there are database connection issues
