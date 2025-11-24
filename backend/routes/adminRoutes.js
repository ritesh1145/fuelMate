const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getAllUsers,
} = require('../controllers/adminController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/adminMiddleware.js');

// --- Admin Routes ---
// We chain the middleware. First 'protect', then 'isAdmin'.
// GET /api/admin/orders
router.route('/orders').get(protect, isAdmin, getAllOrders);

// GET /api/admin/users
router.route('/users').get(protect, isAdmin, getAllUsers);

module.exports = router;
