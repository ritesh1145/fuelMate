const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} = require('../controllers/profileController');

// Profile routes
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/upload', protect, upload.single('profilePicture'), uploadProfilePicture);
router.delete('/picture', protect, deleteProfilePicture);

module.exports = router;
