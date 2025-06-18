import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { CiLogout } from "react-icons/ci";

const SideBar = () => {
  const [activePath, setActivePath] = useState("");
  const { logout } = useAuth();

  return (
    <div className="w-[18%] min-h-screen border-gray-300 border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          onClick={() => setActivePath("/add")}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            activePath === "/add" ? "bg-pink-300" : ""
          }`}
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          onClick={() => setActivePath("/list")}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            activePath === "/list" ? "bg-pink-300" : ""
          }`}
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          onClick={() => setActivePath("/orders")}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            activePath === "/orders" ? "bg-pink-300" : ""
          }`}
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l text-left hover:bg-pink-100 transition-all duration-200"
        >
          <CiLogout className="w-5 h-5" />

          <p className="hidden md:block">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
