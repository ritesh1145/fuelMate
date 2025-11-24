// Script to create an admin user in the database
// Run this with: node backend/scripts/createAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/user.js');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@fuelmate.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@fuelmate.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@fuelmate.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@fuelmate.com');
    console.log('Password: admin123');
    console.log('\nYou can now login to the admin panel with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
