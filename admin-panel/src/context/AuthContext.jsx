import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminUser');
    
    if (token && adminData) {
      setUser(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Clear any existing tokens first
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    try {
      console.log('Attempting login to backend API...');
      // Call the backend API for admin login
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      // Check if user is admin (backend returns data directly, not nested)
      if (response.data.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }
      
      const adminUser = {
        id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
      };
      
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      setUser(adminUser);
      console.log('Login successful! Token stored.');
      return adminUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || error.message || 'Login failed. Please ensure backend is running.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
