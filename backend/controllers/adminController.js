const asyncHandler = require('express-async-handler');
const Order = require('../models/order.js');
const User = require('../models/user.js');

/**
 * @desc    Get all orders (for admin)
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email') // Get customer info
    .populate('driver', 'name email'); // Get driver info
  res.json(orders);
});

/**
 * @desc    Get all users (for admin)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password'); // Find all users, remove password
  res.json(users);
});

module.exports = {
  getAllOrders,
  getAllUsers,
};
