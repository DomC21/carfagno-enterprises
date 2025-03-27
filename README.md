# Carfagno Enterprises Website

This repository contains the source code for the Carfagno Enterprises website, showcasing our AI-driven financial tools and services.

## Features

- Modern React application built with TypeScript and Vite
- Responsive design with dark/futuristic theme
- Interactive demos of our AI tools
- Waitlist system for early access to Zom AI

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Test database connection
pnpm test-db
```

## Waitlist API

The website includes a waitlist system for Zom AI with the following endpoints:

- `POST /api/waitlist` - Submit a new waitlist entry
  - Required fields: name, email
  - Optional fields: phoneNumber, preferredPlan

- `GET /api/waitlist-entries` - View all waitlist entries (admin only)

- `GET /api/db-status` - Check database connection and stats (admin only)

## Database Setup

The waitlist system uses MongoDB to store user submissions. To set up the database:

1. Create a MongoDB Atlas account and cluster
2. Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/waitlist?retryWrites=true&w=majority
   MONGODB_DB=waitlist
   ```
3. Add the same environment variables to your Vercel project settings

### Database Schema

The waitlist entries are stored with the following schema:
- `name`: User's full name (required)
- `email`: User's email address (required, unique)
- `phoneNumber`: User's phone number (optional)
- `preferredPlan`: User's preferred plan (basic, pro, or enterprise)
- `createdAt`: Timestamp when the entry was created

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Force Vercel redeploy Mon Mar  3 17:26:42 UTC 2025
