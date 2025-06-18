import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import SideBar from "./components/SideBar";
import List from "./pages/List";
import Login from "./pages/Login"; // Make sure this exists
import { useAuth } from "./context/AuthContext";
import AdminOrderList from "./pages/AdminOrderList";

const App = () => {
  const { token } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        {token ? (
          <Route
            path="/*"
            element={
              <div className="flex gap-2">
                <SideBar />
                <Routes>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<AdminOrderList />} />
                </Routes>
              </div>
            }
          />
        ) : (
          // Redirect all protected paths to login if not authenticated
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
