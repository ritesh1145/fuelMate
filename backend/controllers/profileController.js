const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const path = require('path');
const fs = require('fs').promises;

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields if provided
  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  
  // Driver-specific fields
  if (user.role === 'driver') {
    user.licenseNumber = req.body.licenseNumber || user.licenseNumber;
    user.vehicleNumber = req.body.vehicleNumber || user.vehicleNumber;
    user.vehicleType = req.body.vehicleType || user.vehicleType;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    profilePicture: updatedUser.profilePicture,
    role: updatedUser.role,
    licenseNumber: updatedUser.licenseNumber,
    vehicleNumber: updatedUser.vehicleNumber,
    vehicleType: updatedUser.vehicleType,
    address: updatedUser.address,
    city: updatedUser.city,
    state: updatedUser.state,
    status: updatedUser.status,
  });
});

// @desc    Upload profile picture
// @route   POST /api/profile/upload
// @access  Private
const uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Delete old profile picture if exists
  if (user.profilePicture) {
    const oldImagePath = path.join(__dirname, '..', 'uploads', 'profiles', path.basename(user.profilePicture));
    try {
      await fs.unlink(oldImagePath);
    } catch (error) {
      console.log('Error deleting old profile picture:', error.message);
    }
  }

  // Save new profile picture path
  const profilePictureUrl = `/uploads/profiles/${req.file.filename}`;
  user.profilePicture = profilePictureUrl;
  await user.save();

  res.json({
    message: 'Profile picture uploaded successfully',
    profilePicture: profilePictureUrl,
  });
});

// @desc    Delete profile picture
// @route   DELETE /api/profile/picture
// @access  Private
const deleteProfilePicture = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.profilePicture) {
    res.status(400);
    throw new Error('No profile picture to delete');
  }

  // Delete profile picture file
  const imagePath = path.join(__dirname, '..', 'uploads', 'profiles', path.basename(user.profilePicture));
  try {
    await fs.unlink(imagePath);
  } catch (error) {
    console.log('Error deleting profile picture file:', error.message);
  }

  // Remove from database
  user.profilePicture = null;
  await user.save();

  res.json({
    message: 'Profile picture deleted successfully',
  });
});

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture,
};
