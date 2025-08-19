/**
 * Vercel API Handler for VincAI Backend
 * This exports the Express app for Vercel's serverless environment
 */

// Import the main server application
const app = require('../backend/server.js');

// Export the app as a Vercel handler
module.exports = app;
