# MongoDB Atlas Troubleshooting Guide

This document provides troubleshooting steps for common MongoDB Atlas connection issues.

## Authentication Errors

If you encounter an "Authentication failed" error when connecting to MongoDB Atlas:

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
   ```
   mongodb+srv://domcarfagno:<password>@cluster0.psz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   mongodb+srv://domcarfagno:<password>@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0
   ```

5. **URL Encoding**
   - If your password contains special characters, try URL encoding it:
   ```javascript
   const password = encodeURIComponent('YourPassword');
   const uri = `mongodb+srv://username:${password}@cluster...`;
   ```

## Connection Timeout Errors

If you encounter connection timeout errors:

1. **Network Connectivity**
   - Check if your network allows outbound connections to MongoDB Atlas
   - Verify there are no firewall rules blocking the connection

2. **IP Whitelist**
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - For Vercel deployments, allow access from anywhere (0.0.0.0/0)

3. **DNS Resolution**
   - Verify that DNS resolution is working correctly
   - Try using a different DNS server if needed

## Application Deployment Issues

For issues when deploying your application:

1. **Environment Variables**
   - Ensure environment variables are correctly set in your deployment platform
   - Verify the connection string is properly escaped if it contains special characters

2. **Fallback Mechanism**
   - Implement a fallback mechanism for when MongoDB is not available
   - Add proper error handling to gracefully handle connection issues

3. **Vercel Specific Issues**
   - For Vercel deployments, ensure environment variables are set for all environments (Production, Preview, Development)
   - Use the Vercel dashboard to verify environment variables are correctly set

## Testing Connection

Use the provided test scripts to verify your MongoDB connection:

```bash
node scripts/test-mongodb-final.js
```

This script will attempt to connect to MongoDB Atlas and provide detailed error information if the connection fails.
