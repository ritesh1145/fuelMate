const asyncHandler = require('express-async-handler');
const Order = require('../models/order.js');

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private (Needs token)
 */
const createOrder = asyncHandler(async (req, res) => {
  const {
    fuelType,
    quantity,
    pricePerLiter,
    totalAmount,
    deliveryAddress,
    customerPhone,
    supplierName,
    supplierArea,
    location,
    paymentMethod,
    notes
  } = req.body;

  if (!fuelType || !quantity || !deliveryAddress || !totalAmount || !customerPhone) {
    return res.status(400).json({ message: 'Please provide all required order details' });
  }

  const order = new Order({
    user: req.user._id, // req.user comes from our 'protect' middleware
    customerName: req.user.name,
    customerEmail: req.user.email,
    customerPhone,
    fuelType,
    quantity,
    pricePerLiter: pricePerLiter || (totalAmount / quantity),
    totalAmount,
    deliveryAddress,
    supplierName,
    supplierArea,
    location,
    paymentMethod: paymentMethod || 'cash',
    notes,
    status: 'Pending',
  });

  const createdOrder = await order.save();
  
  // TODO: Send notification to suppliers/fuel stations
  // TODO: Notify admin about new order
  
  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: createdOrder,
  });
});

/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private (Needs token)
 */
const getMyOrders = asyncHandler(async (req, res) => {
  // req.user._id comes from the 'protect' middleware
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

/**
 * @desc    Get all pending orders for drivers
 * @route   GET /api/orders/pending
 * @access  Private (Driver only)
 */
const getPendingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    status: { $in: ['Pending', 'Accepted_By_Supplier'] }
  })
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
  
  res.json(orders);
});

/**
 * @desc    Get orders assigned to a specific driver
 * @route   GET /api/orders/mydeliveries
 * @access  Private (Driver only)
 */
const getMyDeliveries = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    driver: req.user._id,
    status: { $in: ['Assigned_To_Driver', 'In_Transit'] }
  })
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
  
  res.json(orders);
});

/**
 * @desc    Driver accepts an order
 * @route   PUT /api/orders/:id/accept
 * @access  Private (Driver only)
 */
const acceptOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.status !== 'Pending' && order.status !== 'Accepted_By_Supplier') {
    return res.status(400).json({ message: 'Order cannot be accepted at this stage' });
  }

  order.driver = req.user._id;
  order.driverName = req.user.name;
  order.status = 'Assigned_To_Driver';
  order.assignedToDriverAt = Date.now();

  const updatedOrder = await order.save();
  
  // TODO: Send notification to customer about driver assignment
  
  res.json({
    success: true,
    message: 'Order accepted successfully!',
    order: updatedOrder,
  });
});

/**
 * @desc    Driver/Supplier rejects an order
 * @route   PUT /api/orders/:id/reject
 * @access  Private (Driver/Supplier only)
 */
const rejectOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = 'Rejected';
  const updatedOrder = await order.save();
  
  // TODO: Send notification to customer about rejection
  
  res.json({
    success: true,
    message: 'Order rejected',
    order: updatedOrder,
  });
});

/**
 * @desc    Update order status (for driver to mark in-transit or delivered)
 * @route   PUT /api/orders/:id/status
 * @access  Private (Driver only)
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Check if the driver is assigned to this order
  if (order.driver.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this order' });
  }

  order.status = status;
  
  if (status === 'Delivered') {
    order.deliveredAt = Date.now();
    order.paymentStatus = 'paid';
  }

  const updatedOrder = await order.save();
  
  // TODO: Send notification to customer about status update
  
  res.json({
    success: true,
    message: `Order marked as ${status}`,
    order: updatedOrder,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getPendingOrders,
  getMyDeliveries,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
};