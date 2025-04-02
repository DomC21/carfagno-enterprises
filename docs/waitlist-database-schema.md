# Waitlist Database Schema

This document describes the schema for the waitlist database used in the Carfagno Enterprises website.

## Database: `waitlist`

### Collection: `waitlistentries`

| Field | Type | Description | Constraints |
|-------|------|-------------|------------|
| `_id` | ObjectId | Unique identifier | Auto-generated |
| `name` | String | User's full name | Required |
| `email` | String | User's email address | Required, Unique |
| `phoneNumber` | String | User's phone number | Optional |
| `preferredPlan` | String | User's preferred plan | Enum: 'basic', 'pro', 'enterprise', Default: 'basic' |
| `createdAt` | Date | Timestamp when entry was created | Default: current date |

## Indexes

- Text index on `name` and `email` for search functionality
- Unique index on `email` to prevent duplicate entries

## Example Document

```json
{
  "_id": ObjectId("60d21b4667d0d8992e610c85"),
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "preferredPlan": "pro",
  "createdAt": ISODate("2025-03-27T12:00:00Z")
}
```

## API Endpoints

The following API endpoints interact with this database:

- `POST /api/waitlist` - Submit a new waitlist entry
- `GET /api/waitlist-entries` - View all waitlist entries (admin only)
- `GET /api/db-status` - Check database connection and stats (admin only)

## Data Validation

The following validation is performed on the data:

- `name`: Required, trimmed
- `email`: Required, trimmed, converted to lowercase, must be unique
- `phoneNumber`: Optional, trimmed
- `preferredPlan`: Must be one of: 'basic', 'pro', 'enterprise'
