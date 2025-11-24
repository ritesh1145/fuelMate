const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links this to the User model
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'CNG', 'Electric'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerLiter: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
    // Supplier/Station info
    supplierName: {
      type: String,
      required: false,
    },
    supplierArea: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Accepted_By_Supplier', 'Assigned_To_Driver', 'In_Transit', 'Delivered', 'Cancelled', 'Rejected'],
      default: 'Pending',
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links to the driver (a User with role 'driver')
      default: null,
    },
    driverName: {
      type: String,
      required: false,
    },
    // Timestamps for tracking
    acceptedBySupplierAt: {
      type: Date,
    },
    assignedToDriverAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    // Additional info
    notes: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi', 'wallet'],
      default: 'cash',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;