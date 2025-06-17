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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md border">
      <div className="flex flex-col items-center">
        {userInfo.profilePicture ? (
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl mb-4">
            {userInfo.name[0]}
          </div>
        )}
        <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
        <p className="text-gray-600">{userInfo.email}</p>

        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
