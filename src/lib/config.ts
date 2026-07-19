/**
 * Centralized API base URL for all client-side fetch calls.
 * Uses NEXT_PUBLIC_API_URL from environment variables.
 * Set this in .env.local (dev) or Vercel Environment Variables (production).
 *
 * Local:      http://localhost:5000
 * Production: https://your-server.onrender.com
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
