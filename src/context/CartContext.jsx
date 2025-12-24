import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Fetch cart from API on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(API.myCart);

        if (response.status === 200) {
          const data = response.data.data;
          setCartItems(data.items || []);
        } else {
          Error("Failed to fetch cart data from server");
        }
      } catch (error) {
        // console.error("Error fetching cart:", error);
      }
    };

    // If user logged out, clear local cart state immediately
    if (!user) {
      setCartItems([]);
      localStorage.removeItem("cart");
      return;
    }

    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    try {
      const response = await axiosInstance.post(
        API.addToCart,
        {
          productId: product._id,
        }
      );

      if (response.status === 200) {
        // Force immediate state update
        const newItems = response.data.data.items;
        setCartItems([...newItems]);
        
        // Show success message
        toast.success(`تمت إضافة ${product.name} إلى العربة`);
        
        // Open cart to show immediate feedback
        setTimeout(() => {
          setIsCartOpen(true);
        }, 100);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("حدث خطأ أثناء إضافة المنتج للعربة");
    }
  };

  const removeFromCart = async (productId) => {
    const item = cartItems.find((item) => item.id === productId);

    // Try to sync with backend
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axiosInstance.delete(API.removeCartItem(productId));

      if (response.status === 200) {
        setCartItems(response.data.data.items);
        toast.success(`تمت إزالة ${item.product.name} من العربة`);
      }
    } catch (error) {
      console.warn("Backend sync failed for remove:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Try to sync with backend
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axiosInstance.put(
        API.updateCartItem,
        {
          productId: productId,
          quantity: quantity,
        }
      );

      if (response.status === 200) {
        setCartItems(response.data.data.items);
      }
    } catch (error) {
      console.warn("Backend sync failed for update:", error);
    }
  };

  const clearCart = async () => {
    // Clear locally first
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("تم تفريغ العربة بنجاح");

    // Try to sync with backend
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await axiosInstance.delete(API.clearCart);
    } catch (error) {
      console.warn("Backend sync failed for clear:", error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
