const asyncHandler = require('express-async-handler');

// This middleware runs *after* the 'protect' middleware
// It checks if the user (already attached to req.user) is an admin

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403); // 403 Forbidden
    throw new Error('Not authorized as an administrator');
  }
});

module.exports = { isAdmin };