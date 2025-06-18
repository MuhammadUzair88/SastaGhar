// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListing from "./pages/ProductListing";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import AddToCart from "./pages/AddToCart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { useAuth } from "./context/AuthContext";
import UserOrderList from "./pages/UserOrderList";

// Inline PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { userToken } = useAuth();
  return userToken ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<OrderPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <AddToCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/orderlist"
          element={
            <PrivateRoute>
              <UserOrderList />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
