# MongoDB Atlas Setup Guide

This document provides a step-by-step guide for setting up MongoDB Atlas for the Carfagno Enterprises waitlist system.

## Prerequisites

- MongoDB Atlas account
- Node.js and npm installed
- Basic understanding of MongoDB concepts

## Step 1: Create a MongoDB Atlas Cluster

1. Sign up or log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new project (if needed)
3. Create a new cluster:
   - Choose the free tier (M0)
   - Select a cloud provider and region
   - Choose a cluster name
   - Click "Create Cluster"

## Step 2: Configure Database Access

1. In the MongoDB Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a user with the following settings:
   - Authentication Method: Password
   - Username: Choose a simple username
   - Password: Choose a simple password without special characters
   - Database User Privileges: "Read and write to any database"
4. Click "Add User"

## Step 3: Configure Network Access

1. In the MongoDB Atlas dashboard, go to "Network Access"
2. Click "Add IP Address"
3. For development, you can choose "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add specific IP addresses
5. Click "Confirm"

## Step 4: Get Connection String

1. In the MongoDB Atlas dashboard, go to "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following environment variables:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   MONGODB_DB=waitlist
   ```
3. Replace `<username>`, `<password>`, `<cluster-url>`, and `<database>` with your actual values

## Step 6: Test Connection

1. Run the connection test script:
   ```bash
   node --experimental-modules scripts/mongodb-tests/test-mongodb-connection-secure.js
   ```
2. Verify that the connection is successful

## Step 7: Configure Vercel Environment Variables

1. In the Vercel dashboard, go to your project settings
2. Navigate to the "Environment Variables" section
3. Add the same environment variables as in Step 5
4. Make sure to add these variables to all environments (Production, Preview, Development)

## Troubleshooting

If you encounter connection issues:

1. Verify that your IP address is allowed in the Network Access settings
2. Check that your username and password are correct
3. Ensure the cluster is fully provisioned and running
4. Try using a simple password without special characters
5. Verify that the database user has the correct permissions

## Security Considerations

- Never commit the connection string with credentials to the repository
- Use environment variables for sensitive information
- Limit database user permissions to only what is needed
- Regularly rotate database user passwords
