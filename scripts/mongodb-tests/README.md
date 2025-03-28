# MongoDB Test Scripts

This directory contains scripts for testing the MongoDB Atlas integration.

## Available Scripts

- `test-mongodb-connection-secure.js`: Tests the MongoDB connection using environment variables (recommended)

## Usage

To run the tests, make sure you have the following environment variables set in `.env.local`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
MONGODB_DB=waitlist
```

Then run:

```bash
npm install dotenv mongodb
node --experimental-modules scripts/mongodb-tests/test-mongodb-connection-secure.js
```

## Security Note

These test scripts are designed to use environment variables for sensitive information. Never hardcode credentials in test scripts or commit them to the repository.
