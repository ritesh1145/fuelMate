// This is the main entry point for the backend application.

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Import route files
const authRoutes = require('./routes/auth.js');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the app to accept JSON in the request body

// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('FuelMate API is running...');
});

// Mount routers
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
