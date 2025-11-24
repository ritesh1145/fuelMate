import { apiClient } from './apiClient';

/**
 * Registers a new DRIVER.
 */
export const registerUser = (name, email, password, phone, licenseNumber, vehicleNumber, vehicleType, address) => {
  return apiClient('/api/auth/register', {
    body: {
      name,
      email,
      password,
      phone,
      licenseNumber,
      vehicleNumber,
      vehicleType,
      address,
      role: 'driver', // <--- THIS IS THE CRITICAL CHANGE
      status: 'pending', // Drivers need admin approval
    },
  });
};

/**
 * Logs in a user (customer or driver, the route is the same).
 */
export const loginUser = (email, password) => {
  return apiClient('/api/auth/login', {
    body: {
      email,
      password,
    },
  });
};