// This file simulates API calls to a backend.

// Mock user database
const users = [
    { id: '1', name: 'John Doe', email: 'john@test.com', password: 'password123' }
];

// Mock order database
const orders = [
    { id: '101', userId: '1', date: '2025-10-06', fuelType: 'Petrol', quantity: 30, total: '₹2,700', status: 'Delivered' },
    { id: '102', userId: '1', date: '2025-09-28', fuelType: 'Diesel', quantity: 50, total: '₹4,500', status: 'Delivered' },
];

const simulateNetworkRequest = (delay = 1000) =>
  new Promise(resolve => setTimeout(resolve, delay));

// Corrected: Renamed from loginUser to mockLogin
export const mockLogin = async (email, password) => {
  await simulateNetworkRequest();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { id: user.id, name: user.name, email: user.email };
  }
  throw new Error('Invalid email or password');
};

// Corrected: Renamed from signUpUser to mockSignUp
export const mockSignUp = async (name, email, password) => {
  await simulateNetworkRequest();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  const newUser = { id: String(users.length + 1), name, email, password };
  users.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

export const fetchOrderHistory = async (userId) => {
    await simulateNetworkRequest();
    return orders.filter(o => o.userId === userId);
};

export const createOrder = async (userId, orderDetails) => {
    await simulateNetworkRequest();
    const newOrder = {
        id: String(orders.length + 101),
        userId,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        ...orderDetails,
    };
    orders.push(newOrder);
    return newOrder;
};

