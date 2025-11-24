import { apiClient } from './apiClient';

/**
 * Registers a new user.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 * @returns {Promise<object>} The user data and token
 */
export const registerUser = (name, email, password, phone) => {
  return apiClient('/api/auth/register', {
    body: {
      name,
      email,
      password,
      phone,
      role: 'customer', // This app will always register 'customer' roles
    },
  });
};

/**
 * Logs in a user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} The user data and token
 */
export const loginUser = (email, password) => {
  return apiClient('/api/auth/login', {
    body: {
      email,
      password,
    },
  });
};