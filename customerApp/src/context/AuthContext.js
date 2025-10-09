import React, { createContext, useReducer, useEffect } from 'react';
import { mockLogin, mockSignUp } from '../api/mockApi';

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
    loading: true, // Start with loading true to check for persisted user
  });

  useEffect(() => {
    // In a real app, you'd check AsyncStorage or a secure store for a token
    // For now, we'll just simulate it by starting with no user.
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await mockLogin(email, password);
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signUp = async (name, email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await mockSignUp(name, email, password);
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    // In a real app, you would clear the token from storage
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

