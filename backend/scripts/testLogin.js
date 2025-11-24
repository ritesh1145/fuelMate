// Script to test admin login and get users
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testAdminFlow = async () => {
  try {
    console.log('1. Testing Admin Login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@fuelmate.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('User:', loginResponse.data.name);
    console.log('Role:', loginResponse.data.role);
    console.log('Token:', loginResponse.data.token.substring(0, 20) + '...');
    
    const token = loginResponse.data.token;
    
    console.log('\n2. Testing Get Users with Admin Token...');
    const usersResponse = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log(`✅ Users fetched successfully! Total: ${usersResponse.data.length}`);
    console.log('\nCustomer Users:');
    usersResponse.data
      .filter(user => user.role === 'customer')
      .forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    
    console.log('\n✅ Admin panel should work correctly after login!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
};

testAdminFlow();
