import { apiClient } from './apiClient';

/**
 * Fetches all pending orders (available for drivers to accept).
 * @param {string} token - The driver's auth token
 */
export const getPendingOrders = (token) => {
  return apiClient('/api/orders/pending', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Fetches driver's assigned deliveries
 * @param {string} token - The driver's auth token
 */
export const getMyDeliveries = (token) => {
  return apiClient('/api/orders/mydeliveries', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Allows a driver to accept an order.
 * @param {string} orderId - The ID of the order to accept
 * @param {string} token - The driver's auth token
 */
export const acceptOrder = (orderId, token) => {
  return apiClient(`/api/orders/${orderId}/accept`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Allows a driver to reject an order.
 * @param {string} orderId - The ID of the order to reject
 * @param {string} token - The driver's auth token
 */
export const rejectOrder = (orderId, token) => {
  return apiClient(`/api/orders/${orderId}/reject`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Allows a driver to update an order's status.
 * @param {string} orderId - The ID of the order
 * @param {string} status - The new status (e.g., 'In_Transit', 'Delivered')
 * @param {string} token - The driver's auth token
 */
export const updateOrderStatus = (orderId, status, token) => {
  return apiClient(`/api/orders/${orderId}/status`, {
    method: 'PUT',
    body: { status },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};