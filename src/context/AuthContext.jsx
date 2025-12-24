import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../utils/api";
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

  const refreshToken = async () => {
    const currentToken = localStorage.getItem("authToken");

    if (!currentToken) {
      throw new Error("No token available");
    }

    try {
      const response = await axios.post(
        API.refresh,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user: userData } = response.data;

      if (token) {
        // Update token in localStorage
        localStorage.setItem("authToken", token);

        // Update user data if provided
        if (userData) {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          setUser(userData);

          // Update admin status based on role
          if (userData.role === "admin") {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", "true");
          } else {
            setIsAdmin(false);
            localStorage.setItem("isAdmin", "false");
          }
        }

        return { token, user: userData };
      } else {
        throw new Error("No token in refresh response");
      }
    } catch (error) {
      // If refresh fails, clear auth data
      logout();
      throw error;
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    adminLogin,
    logout,
    register,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
