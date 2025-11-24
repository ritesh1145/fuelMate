import { apiClient } from './apiClient';

/**
 * Creates a new order.
 * @param {object} orderData - { fuelType, quantity, location, totalAmount }
 * @param {string} token - The user's auth token
 * @returns {Promise<object>} The created order
 */
export const createOrder = (orderData, token) => {
  return apiClient('/api/orders', {
    body: orderData,
    headers: {
      Authorization: `Bearer ${token}`, // Send the token for protected routes
    },
  });
};

/**
 * Fetches the current user's order history.
 * @param {string} token - The user's auth token
 * @returns {Promise<Array>} A list of the user's orders
 */
export const getMyOrders = (token) => {
  return apiClient('/api/orders/myorders', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Send the token for protected routes
    },
  });
};
