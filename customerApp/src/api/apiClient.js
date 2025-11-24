import { Alert } from 'react-native';

// --- CRITICAL STEP ---
// For Android Emulator: Use 10.0.2.2 to access host machine's localhost
// For Physical Device: Use your computer's IP address (e.g., 192.168.x.x)
// Your backend server must be running on port 5000!
const API_URL = 'http://10.0.2.2:5000'; // Android Emulator

/**
 * A helper function for making API requests.
 * @param {string} endpoint The API endpoint (e.g., '/api/auth/login')
 * @param {object} options The options for the fetch call (method, body, etc.)
 * @returns {Promise<object>} The JSON response from the server
 * @throws {Error} If the network request fails or returns a non-OK status
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
      // Use the server's error message if available, otherwise a default
      throw new Error(data.message || 'An API error occurred');
    }
  } catch (error) {
    // This catches network errors (e.g., server not running, wrong IP)
    console.error('API client error:', error);
    Alert.alert(
      'Connection Error',
      `Could not connect to the server at ${API_URL}. Make sure the server is running and the IP address is correct.`
    );
    throw new Error(error.message);
  }
};