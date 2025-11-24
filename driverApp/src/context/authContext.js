import React, { createContext, useReducer, useEffect } from 'react';
// Import from the new driver-specific authApi.js
import { registerUser, loginUser } from '../api/authApi';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    // In a real app, you'd check AsyncStorage for a token
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await loginUser(email, password);
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signUp = async (name, email, password, phone, licenseNumber, vehicleNumber, vehicleType, address) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // This now calls the registerUser func that sends 'role: driver'
      const user = await registerUser(name, email, password, phone, licenseNumber, vehicleNumber, vehicleType, address);
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;