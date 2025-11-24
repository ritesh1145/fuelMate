const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getPendingOrders,
  getMyDeliveries,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
} = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');

// POST /api/orders - Create new order
router.route('/').post(protect, createOrder);

// GET /api/orders/myorders - Get customer's orders
router.route('/myorders').get(protect, getMyOrders);

// GET /api/orders/pending - Get all pending orders (for drivers/suppliers)
router.route('/pending').get(protect, getPendingOrders);

// GET /api/orders/mydeliveries - Get driver's assigned deliveries
router.route('/mydeliveries').get(protect, getMyDeliveries);

// PUT /api/orders/:id/accept - Driver accepts order
router.route('/:id/accept').put(protect, acceptOrder);

// PUT /api/orders/:id/reject - Driver/Supplier rejects order
router.route('/:id/reject').put(protect, rejectOrder);

// PUT /api/orders/:id/status - Update order status
router.route('/:id/status').put(protect, updateOrderStatus);

module.exports = router;