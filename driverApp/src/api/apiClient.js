import { Alert } from 'react-native';

// --- CRITICAL STEP ---
// This MUST be the same IP Address as your customerApp
// to connect to the same backend server.
const API_URL = 'http://10.180.29.109:5000'; // <--- USING YOUR IP

/**
 * A helper function for making API requests.
 */
export const apiClient = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;

  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...customConfig.headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An API error occurred');
    }
  } catch (error) {
    console.error('API client error:', error);
    Alert.alert(
      'Connection Error',
      `Could not connect to the server at ${API_URL}. Make sure the server is running and the IP address is correct.`
    );
    throw new Error(error.message);
  }
};