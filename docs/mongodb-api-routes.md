# MongoDB API Routes

This document provides an overview of the API routes that interact with MongoDB for the Carfagno Enterprises waitlist system.

## Available API Routes

### 1. Submit Waitlist Entry

**Endpoint:** `/api/waitlist`  
**Method:** POST  
**Description:** Adds a new entry to the waitlist

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phoneNumber": "555-123-4567", // Optional
  "preferredPlan": "basic" // Optional, defaults to "basic"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "entry": {
    "name": "User Name",
    "email": "user@example.com",
    "phoneNumber": "555-123-4567",
    "preferredPlan": "basic",
    "createdAt": "2025-03-28T03:45:47.774Z"
  },
  "storage": "mongodb"
}
```

**Error Responses:**
- 400: Missing required fields
- 409: Email already registered
- 500: Server error

### 2. Retrieve Waitlist Entries

**Endpoint:** `/api/waitlist-entries`  
**Method:** GET  
**Description:** Retrieves all waitlist entries

**Success Response:**
```json
{
  "success": true,
  "entries": [
    {
      "name": "User Name",
      "email": "user@example.com",
      "phoneNumber": "555-123-4567",
      "preferredPlan": "basic",
      "createdAt": "2025-03-28T03:45:47.774Z"
    }
  ],
  "count": 1,
  "storage": "mongodb"
}
```

**Error Response:**
- 500: Server error

### 3. Database Status

**Endpoint:** `/api/db-status`  
**Method:** GET  
**Description:** Checks the status of the MongoDB connection

**Success Response:**
```json
{
  "connected": true,
  "database": "waitlist",
  "collections": ["waitlistentries"],
  "entryCount": 5
}
```

**Error Response:**
- 500: Server error

## Fallback Mechanism

All API routes implement a fallback mechanism that uses in-memory storage when MongoDB is not available. This ensures the application remains functional during development or if there are database connection issues.

When using the fallback mechanism, the API responses will include `"storage": "in-memory"` to indicate that the data is being stored in memory rather than in MongoDB.

## Error Handling

The API routes include comprehensive error handling to ensure a smooth user experience:

- Validation errors for missing or invalid fields
- Duplicate entry detection
- Database connection error handling
- Graceful degradation to fallback storage

## Security Considerations

- The API routes do not expose sensitive database information
- Input validation is performed to prevent injection attacks
- Rate limiting should be implemented to prevent abuse
- Authentication should be added for the waitlist-entries endpoint in production
