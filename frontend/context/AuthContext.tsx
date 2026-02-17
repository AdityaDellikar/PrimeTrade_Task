'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '@/lib/axios';
import type { User } from '@/types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'primetrade_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data.data);
    } catch {
      logout();
    }
  }, [logout]);

  const login = useCallback((nextToken: string, nextUser: User) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);
    refreshProfile().finally(() => setLoading(false));
  }, [refreshProfile]);

  const value = useMemo(
    () => ({ user, token, loading, login, logout, refreshProfile }),
    [user, token, loading, login, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
