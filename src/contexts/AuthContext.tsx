import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "Employee" | "Manager" | "Admin";

interface User {
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string, role: UserRole) => {
    const namePart = email.split("@")[0].split(".").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const name = namePart || "Priya Sharma";
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    setUser({ name, email, role, initials, department: "Sewa" });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
