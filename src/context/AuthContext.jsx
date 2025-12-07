import { createContext, useContext, useState, useEffect } from "react";
// import { useCart } from "./CartContext";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // const { setCartItems } = useCart();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedIsAdmin) {
      setIsAdmin(storedIsAdmin === "true");
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(false); // Reset admin status for regular users
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("isAdmin", "false");
  };

  const adminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    // setCartItems([]);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("authToken");
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login(newUser);
    return newUser;
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    adminLogin,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
