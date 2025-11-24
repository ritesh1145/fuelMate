// Script to check all users in the database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/user.js');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // Get all users
    const users = await User.find({});
    
    console.log(`Total users in database: ${users.length}\n`);
    
    if (users.length === 0) {
      console.log('No users found in database!');
    } else {
      console.log('Users:');
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkUsers();
