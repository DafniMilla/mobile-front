import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("username");

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser({ username: storedUser });

      setLoading(false);
    };
    loadStorage();
  }, []);

  const login = async (token: string, user: any) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("username", user.username);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  };

  if (loading) return null; // Pode trocar por splash screen depois

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
