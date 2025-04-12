import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const isVercelEnvironment = process.env.VERCEL === '1';

if (!isVercelEnvironment) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rootDir = path.resolve(__dirname, '../../../');

    const envLocalPath = path.resolve(rootDir, '.env.local');
    const envPath = path.resolve(rootDir, '.env');

    if (fs.existsSync(envLocalPath)) {
      console.log('Loading environment variables from .env.local');
      dotenv.config({ path: envLocalPath });
    } else if (fs.existsSync(envPath)) {
      console.log('Loading environment variables from .env');
      dotenv.config({ path: envPath });
    } else {
      console.log('No .env or .env.local file found, using existing environment variables');
    }
  } catch (error) {
    console.log('Error loading environment files:', error.message);
    console.log('Continuing with existing environment variables');
  }
} else {
  console.log('Running in Vercel environment, using Vercel environment variables');
}

export function isMongoDatabaseConfigured() {
  return !!process.env.MONGODB_URI;
}
