import { useState } from "react";
import {
  FaShoppingBag,
  FaUser,
  FaRegCommentDots,
  FaHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex flex-col">
        <div className="flex items-center justify-between p-4 px-8">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <FaShoppingBag className="text-[#8CB7F5] text-2xl" />
            <span className="text-[#8CB7F5] text-xl font-bold">Brand</span>
          </div>

          {/* Search Bar */}
          <div className="flex w-1/2 border border-blue-500 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 outline-none"
            />
            <select className="px-3 border-l border-blue-500 outline-none">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Books</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2">Search</button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-600 text-sm">
            {[
              { icon: <FaUser className="text-xl" />, label: "Profile" },
              {
                icon: <FaRegCommentDots className="text-xl" />,
                label: "Messages",
              },
              { icon: <FaHeart className="text-xl" />, label: "Orders" },
              { icon: <FaShoppingCart className="text-xl" />, label: "Cart" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Links */}
        <div className="border-t border-[#E0E0E0] p-4 px-14 flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <h1 className="flex items-center gap-2">
              <IoMenuSharp /> All Categories
            </h1>
            <h1>Hot Offers</h1>
            <h1>Gift Boxes</h1>
            <h1>Projects</h1>
            <h1>Menu Item</h1>
            <div>
              <label htmlFor="help">Help</label>
              <select name="help" id="help" className="ml-2 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label>English, USD</label>
              <select className="outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                Ship to
                <img
                  className="w-6 h-4 object-cover"
                  src="https://flagcdn.com/w320/us.png"
                  alt="flag"
                />
              </label>
              <select className="outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex flex-col gap-3">
        {/* Top Bar */}
        <div className="px-6 py-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <IoMenuSharp className="text-2xl" />
            </button>
            <div className="flex items-center gap-2">
              <FaShoppingBag className="text-[#8CB7F5] text-3xl" />
              <span className="text-[#8CB7F5] text-2xl font-bold">Brand</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaShoppingCart className="text-2xl" />
            <FaUser className="text-2xl" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative px-5">
          <FaSearch className="absolute top-3 left-7 text-gray-400 text-lg" />
          <input
            className="w-full h-10 bg-gray-100 border border-gray-300 rounded-xl pl-10 pr-4 text-lg"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* Category Buttons */}
        <div className="px-4 py-2 flex items-center flex-wrap gap-2">
          {[
            "All category",
            "Gadgets",
            "Clothes",
            "Accessories",
            "Electronics",
            "Books",
          ].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 bg-gray-100 text-blue-600 rounded-lg whitespace-nowrap text-sm"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Slide-out Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <ImCross className="text-xl text-gray-600" />
              </button>
            </div>
            <ul className="space-y-4 text-gray-700 text-base">
              <li className="flex items-center gap-2">
                <FaRegCommentDots />
                Messages
              </li>
              <li className="flex items-center gap-2">
                <FaHeart />
                Orders
              </li>
              <li className="flex items-center gap-2">
                <FaUser />
                Profile
              </li>
              <li className="flex items-center gap-2">
                <FaShoppingCart />
                Cart
              </li>
              {/* Add more items as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
