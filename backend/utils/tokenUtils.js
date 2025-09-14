// This utility file provides functions for handling JSON Web Tokens (JWT).

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generates a JWT for a given user ID.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will expire in 30 days
  });
};

module.exports = { generateToken };
