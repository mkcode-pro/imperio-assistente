
import { useState, useEffect } from 'react';
import { AdminStorage } from '@/utils/admin-storage';

const ADMIN_PASSWORD = 'imperio2024'; // Senha fixa para simplicidade

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(AdminStorage.isAuthenticated());
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      AdminStorage.setAuthSession(password);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    AdminStorage.clearAuth();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
