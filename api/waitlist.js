import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Simple in-memory storage for proof of concept
export const waitlistEntries = [];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phoneNumber, preferredPlan } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create waitlist entry
    const entry = {
      id: Date.now().toString(),
      name,
      email,
      phoneNumber: phoneNumber || '',
      preferredPlan: preferredPlan || 'basic',
      createdAt: new Date().toISOString()
    };

    // Store in memory (for proof of concept)
    waitlistEntries.push(entry);
    console.log('New waitlist entry:', entry);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      entry
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong processing your request' 
    });
  }
}
