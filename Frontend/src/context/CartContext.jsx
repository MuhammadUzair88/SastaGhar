// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  const fetchCart = async () => {
    if (!userInfo) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/get`,
        { userId: userInfo._id }
      );
      if (data.success) {
        setCart(data.cartData);
      }
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const addToCart = async (itemId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/add`,
        {
          userId: userInfo._id,
          itemId,
        }
      );
      if (data.success) {
        toast.success("Added to cart");
        fetchCart();
      }
    } catch (err) {
      toast.error("Add to cart failed");
    }
  };

  const updateCart = async (itemId, quantity) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/update`,
        {
          userId: userInfo._id,
          itemId,
          quantity,
        }
      );
      if (data.success) {
        toast.success("Quantity updated");
        fetchCart();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/update`,
        {
          userId: userInfo._id,
          itemId,
          quantity: 0,
        }
      );
      if (data.success) {
        toast.success("Item removed");
        fetchCart();
      }
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/clear`,
        {
          userId: userInfo._id,
        }
      );
      if (data.success) {
        toast.success("Cart cleared");
        setCart({});
      }
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/product/list`
        );
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [userInfo]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        products,
        getTotalItems, // ✅ Add here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
