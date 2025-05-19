import React from "react";
import { MdCreateNewFolder, MdProductionQuantityLimits } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 shadow-lg ">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-white font-bold">
            <MdProductionQuantityLimits />
          </h1>
          <h1 className="font-semibold">PRODUCT STORE</h1>
        </div>
        <div>
          <button className="bg-gray-600 text-white">
            <MdCreateNewFolder />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
