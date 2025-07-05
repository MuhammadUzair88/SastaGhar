import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border">
        <div className="flex flex-col items-center text-center p-6">
          {userInfo.profilePicture ? (
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-white border-4 border-indigo-500">
              {userInfo.name[0]}
            </div>
          )}
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {userInfo.name}
          </h2>
          <p className="text-gray-500 text-sm">{userInfo.email}</p>
        </div>

        <div className="border-t px-6 py-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-medium">Full Name:</span>
            <span>{userInfo.name}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-medium">Email:</span>
            <span>{userInfo.email}</span>
          </div>
          {/* Add more fields here if needed, e.g., phone, address */}
        </div>

        <div className="p-6 pt-4 border-t">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
