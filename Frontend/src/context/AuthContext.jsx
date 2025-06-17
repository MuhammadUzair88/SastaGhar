import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || null
  );
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) localStorage.setItem("token", userToken);
    else localStorage.removeItem("token");

    if (userInfo) localStorage.setItem("userInfo", JSON.stringify(userInfo));
    else localStorage.removeItem("userInfo");
  }, [userToken, userInfo]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/user/login`,
        { email, password }
      );
      if (data.success) {
        setUserToken(data.token);
        setUserInfo(data.user);
        toast.success("Logged in successfully");
        return { success: true };
      }
      toast.error(data.message || "Login failed");
      return { success: false };
    } catch {
      toast.error("Login failed");
      return { success: false };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/user/register`,
        { name, email, password }
      );
      if (data.success) {
        setUserToken(data.token);
        setUserInfo(data.user);
        toast.success("Signup successful");
        return { success: true };
      }
      toast.error(data.message || "Signup failed");
      return { success: false };
    } catch {
      toast.error("Signup failed");
      return { success: false };
    }
  };

  const logout = () => {
    setUserToken(null);
    setUserInfo(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userInfo, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
