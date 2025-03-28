# MongoDB Atlas Setup for Carfagno Enterprises Waitlist

This document provides instructions for setting up and configuring MongoDB Atlas for the Carfagno Enterprises waitlist system.

## 1. Create MongoDB Atlas Cluster

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/) using the Carfagno Enterprises account
2. Click "Build a Cluster" or "Create" button
3. Select the free tier (M0)
4. Choose AWS as the cloud provider
5. Select N. Virginia (us-east-1) as the region
6. Name the cluster "Cluster0"
7. Click "Create Cluster"

## 2. Configure Database Access

1. Navigate to the "Database Access" section
2. Click "Add New Database User"
3. Create a user with the following settings:
   - Authentication Method: Password
   - Username: domcarfagno
   - Password: BullishonNvda1 (or use a simpler password without special characters)
   - Database User Privileges: Read and write to any database
4. Click "Add User"

> **Important**: If you encounter authentication issues, try creating a new database user with a simpler password that doesn't contain special characters.

## 3. Configure Network Access

1. Navigate to the "Network Access" section
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: This is required for Vercel deployments which use dynamic IP addresses
4. Click "Confirm"

## 4. Get Connection String

1. Navigate to the "Clusters" section
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password
6. Replace `myFirstDatabase` with `waitlist`

## 5. Configure Environment Variables

### Local Development

Add the following to your `.env.local` file:

```
MONGODB_URI=mongodb+srv://domcarfagno:BullishonNvda1@cluster0.psz9e.mongodb.net/waitlist?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=waitlist
```

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to the "Environment Variables" section
3. Add the same environment variables as above
4. Deploy your application

## 6. Test Database Connection

Run the database connection test script:

```bash
pnpm test-db
```

This will verify that your application can connect to MongoDB Atlas.

## Troubleshooting

If you encounter connection issues:

1. Verify that your IP address is allowed in the Network Access settings
2. Check that your database username and password are correct
3. Ensure that the cluster is fully provisioned (this can take a few minutes)
4. Verify that the environment variables are correctly set
