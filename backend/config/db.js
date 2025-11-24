const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (needed to get the MONGO_URI)
dotenv.config();

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    // Mongoose uses the connection string stored in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, log the error and exit the application
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;