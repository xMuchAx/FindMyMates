import React from 'react';

export interface AuthContextType {
  auth: {
    userId: string | null;
    token: string | null;
  };
  setAuth: React.Dispatch<React.SetStateAction<{
    userId: string | null;
    token: string | null;
  }>>;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);
