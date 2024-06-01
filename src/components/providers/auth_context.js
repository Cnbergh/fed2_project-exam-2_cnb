'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedAuthState = localStorage.getItem('authState');
      return storedAuthState
        ? JSON.parse(storedAuthState)
        : { token: null, user: null, apiKey: null };
    }
    return { token: null, user: null, apiKey: null };
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
    localStorage.removeItem('avatarUrl'); // Clear avatar URL from local storage
    localStorage.removeItem('avatarAlt'); // Clear avatar alt from local storage
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
