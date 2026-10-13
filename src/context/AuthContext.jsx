import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);


function loadUser() {
  try {
    return JSON.parse(localStorage.getItem("authUser")) ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  
  useEffect(() => {
    if (user) localStorage.setItem("authUser", JSON.stringify(user));
    else localStorage.removeItem("authUser");
  }, [user]);

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) ?? [];
    } catch {
      return [];
    }
  };

  const signup = (name, email, password) => {
    const users = getUsers();

    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "This email is already registered, try logging in." };
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setUser({ name, email });
    return { ok: true };
  };

  const login = (email, password) => {
    const found = getUsers().find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return { ok: false, error: "Incorrect email or password." };

    setUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}