'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    apiKey: null,
  });

  const saveUserData = (data) => {
    const userData = {
      token: data.accessToken || authState.token,
      user: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      },
      apiKey: data.apiKey || authState.apiKey,
    };
    setAuthState(userData);
    localStorage.setItem('authState', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setAuthState({
      token: null,
      user: null,
      apiKey: null,
    });
    localStorage.removeItem('authState');
  };

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, saveUserData, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
