import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('technova_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('technova_token');
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          setUser(res.user);
          localStorage.setItem('technova_user', JSON.stringify(res.user));
        } catch {
          // Token expired or invalid
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await authService.login(credentials);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('technova_token', res.token);
    localStorage.setItem('technova_user', JSON.stringify(res.user));
  };

  const register = async (data: any) => {
    const res = await authService.register(data);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('technova_token', res.token);
    localStorage.setItem('technova_user', JSON.stringify(res.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('technova_token');
    localStorage.removeItem('technova_user');
  };

  const updateUser = async (data: Partial<User>) => {
    const res = await authService.updateProfile(data);
    setUser(res.user);
    localStorage.setItem('technova_user', JSON.stringify(res.user));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
      }}
    >
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
