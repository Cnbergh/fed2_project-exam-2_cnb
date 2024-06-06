'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState } from '@/lib/types';

interface AuthContextProps {
  authState: AuthState;
  saveUserData: (data: Partial<AuthState>) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const storedAuthState = localStorage.getItem('authState');
      return storedAuthState
        ? JSON.parse(storedAuthState)
        : { token: null, user: null, apiKey: null };
    }
    return { token: null, user: null, apiKey: null };
  });

  const saveUserData = (data: Partial<AuthState>) => {
    if (data.token && data.user && data.apiKey) {
      const userData = {
        token: data.token,
        user: data.user,
        apiKey: data.apiKey,
      } as AuthState;
      console.log('Saving user data:', userData);
      setAuthState(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(userData));
      }
    } else {
      console.error('Invalid user data:', data);
    }
  };

  const logoutUser = () => {
    setAuthState({
      token: null,
      user: null,
      apiKey: null,
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authState');
    }
  };

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  useEffect(() => {
    console.log('Stored Auth State:', JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, saveUserData, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
