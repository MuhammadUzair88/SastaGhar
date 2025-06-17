import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [cart, setCart] = useState({}); // { itemId: quantity }

  const fetchCart = async () => {
    if (!userInfo) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/cart/get`,
        {
          userId: userInfo._id,
        }
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
        toast.success("Cart updated");
        fetchCart();
      }
    } catch (err) {
      toast.error("Cart update failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userInfo]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
