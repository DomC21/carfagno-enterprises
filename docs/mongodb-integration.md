# MongoDB Atlas Integration Guide

This document provides a comprehensive overview of the MongoDB Atlas integration for the Carfagno Enterprises waitlist system.

## Connection String Format

The connection string format for MongoDB Atlas follows this pattern:

```
mongodb+srv://<username>:<password>@<cluster-url>/<database>?<options>
```

Replace the placeholders with your actual values:
- `<username>`: Your MongoDB Atlas database username
- `<password>`: Your database user's password
- `<cluster-url>`: Your MongoDB Atlas cluster URL
- `<database>`: Your database name
- `<options>`: Additional connection options

## Authentication Best Practices

For successful authentication with MongoDB Atlas:

1. Create a database user with appropriate permissions (readWrite to the waitlist database)
2. Use simple passwords without special characters to avoid URL encoding issues
3. Configure network access to allow connections from anywhere (0.0.0.0/0) for Vercel deployments
4. Store credentials in environment variables, never in code or documentation

## Environment Variables

The connection string should be stored in environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
MONGODB_DB=<database>
```

## API Routes

The following API routes are available:

- `/api/waitlist.js`: Submit a new waitlist entry
- `/api/waitlist-entries.js`: View all waitlist entries
- `/api/db-status.js`: Check database connection and stats

## Fallback Mechanism

The application is designed to work even without MongoDB connection:

- If MongoDB is not available, it will fall back to in-memory storage
- This ensures the application remains functional during development or if there are database connection issues

## Security Considerations

- The connection string with credentials should only be stored in environment variables
- For local development, use `.env.local` which is gitignored
- For production, set environment variables in the Vercel dashboard
- Never commit the actual connection string with credentials to the repository

## Testing Connection

Use the provided test scripts to verify your MongoDB connection:

```bash
node scripts/test-mongodb-connection.js
```

## Troubleshooting

If you encounter connection issues:

1. **Verify Credentials**
   - Double-check the username and password
   - Ensure there are no typos or special characters that need URL encoding
   - Try creating a new database user if authentication continues to fail

2. **Check Cluster Status**
   - Ensure the cluster is fully provisioned (can take 5-10 minutes)
   - Verify the cluster is in "Active" state in the MongoDB Atlas dashboard

3. **Network Access**
   - Verify that "Allow Access from Anywhere" (0.0.0.0/0) is enabled
   - Check if there are any pending changes that need to be applied

4. **Connection String Format**
   - Ensure the connection string format is correct
   - Try both formats (with and without database name in the URI)

5. **URL Encoding**
   - If your password contains special characters, try URL encoding it:
   ```javascript
   const password = encodeURIComponent('YourPassword');
   const uri = `mongodb+srv://username:${password}@cluster...`;
   ```

## Vercel Deployment

To configure MongoDB in Vercel:
1. Go to your Vercel project settings
2. Navigate to the "Environment Variables" section
3. Add the following variables:
   - `MONGODB_URI`: The full connection string with credentials
   - `MONGODB_DB`: Set to your database name
4. Make sure to add these variables to all environments (Production, Preview, Development)
