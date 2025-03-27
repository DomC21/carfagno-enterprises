// Simple in-memory storage access (shared with waitlist.js)
import { waitlistEntries } from './waitlist';

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return all entries
  return res.status(200).json({ entries: waitlistEntries || [] });
}
