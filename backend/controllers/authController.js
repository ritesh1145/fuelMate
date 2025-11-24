// This file contains the business logic for user authentication (registration and login).

const User = require('../models/user.js');
const { generateToken } = require('../utils/tokenUtils.js');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { name, email, password, phone, role, licenseNumber, vehicleNumber, vehicleType, address, city, state, status } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user data object
    const userData = {
      name,
      email,
      password,
      role: role || 'customer',
    };

    // Add optional fields if provided
    if (phone) userData.phone = phone;
    if (licenseNumber) userData.licenseNumber = licenseNumber;
    if (vehicleNumber) userData.vehicleNumber = vehicleNumber;
    if (vehicleType) userData.vehicleType = vehicleType;
    if (address) userData.address = address;
    if (city) userData.city = city;
    if (state) userData.state = state;
    if (status) userData.status = status;

    // Create a new user instance
    const user = await User.create(userData);

    // If user is created successfully, send back user info and a token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

module.exports = { registerUser, loginUser };