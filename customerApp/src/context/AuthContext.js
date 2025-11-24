import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// CORRECTED: Import from the new, real authApi.js
import { registerUser, loginUser } from '../api/authApi';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true, // Start with loading true to check for persisted user
  });

  useEffect(() => {
    // Check if user data exists in AsyncStorage
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          dispatch({ type: 'LOGIN', payload: JSON.parse(userData) });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // CORRECTED: Now calls the real API
      const user = await loginUser(email, password);
      // Save user data and token to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signUp = async (name, email, password, phone) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // CORRECTED: Now calls the real API
      const user = await registerUser(name, email, password, phone);
      // Save user data and token to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = async () => {
    // Clear the token from AsyncStorage
    try {
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Failed to clear user from storage:', error);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      // Save updated user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
      dispatch({ type: 'UPDATE_USER', payload: updatedUserData });
      return updatedUserData;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;