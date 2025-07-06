import { useState } from "react";
import {
  FaShoppingBag,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All category");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const handleSearch = () => {
    const categoryParam =
      selectedCategory !== "All category" ? selectedCategory : "";
    navigate(
      `/products?search=${encodeURIComponent(
        searchQuery
      )}&category=${encodeURIComponent(categoryParam)}`
    );
  };

  const categories = [
    "Women & Men Clothes",
    "Shoes",
    "Cosmetics & Beauty",
    "Mobile & Accessories",
    "Kitchenware",
    "Babies & Toys",
    "Personal Care Products",
    "Gifts",
    "Watches",
    "Perfumes",
  ];

  return (
    <div className="bg-white shadow-md w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex flex-col">
        <div className="flex items-center justify-between p-4 px-8">
          {/* Brand */}
          <Link to={"/"}>
            <img src="/Logo (2).png" className="w-32" alt="logo" />
          </Link>

          {/* Search Bar */}
          <div className="flex w-1/2 border border-blue-500 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 outline-none"
            />
            <select
              className="px-3 border-l border-blue-500 outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-600 text-sm">
            <button
              onClick={() => {
                navigate("/products");
                setSelectedCategory("All category");
                setShowAllCategories(false);
              }}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                selectedCategory === "All category"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-blue-600"
              }`}
            >
              All Products
            </button>
            {userInfo ? (
              <div
                onClick={() => navigate("/profile")}
                className="flex flex-col items-center cursor-pointer"
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
              </div>
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="flex flex-col items-center cursor-pointer"
              >
                <FaUser className="text-xl" />
                <span>Login</span>
              </div>
            )}
            <Link to={"/orderlist"}>
              <div className="flex flex-col items-center cursor-pointer">
                <FaHeart className="text-xl" />
                <span>Orders</span>
              </div>
            </Link>
            <Link to={"/cart"}>
              <div className="relative flex flex-col items-center cursor-pointer">
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {totalItems}
                  </span>
                )}
                <FaShoppingCart className="text-xl" />
                <span>Cart</span>
              </div>
            </Link>
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
            <Link to={"/"}>
              <div className="flex items-center gap-2">
                <img src="/Logo (2).png" className="w-20" alt="logo" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4 relative">
            <Link to={"/cart"}>
              <div className="relative">
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {totalItems}
                  </span>
                )}
                <FaShoppingCart className="text-2xl" />
              </div>
            </Link>
            {userInfo ? (
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative px-5">
          <FaSearch className="absolute top-3 left-7 text-gray-400 text-lg" />
          <input
            className="w-full h-10 bg-gray-100 border border-gray-300 rounded-xl pl-10 pr-4 text-lg"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Category Buttons */}
        <div className="px-4 py-2 flex items-center flex-wrap gap-2">
          <button
            onClick={() => {
              navigate("/products");
              setSelectedCategory("All category");
              setShowAllCategories(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              selectedCategory === "All category"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-blue-600"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-blue-600"
          >
            {showAllCategories ? "Hide Categories" : "All Categories"}
          </button>
        </div>

        {showAllCategories && (
          <div className="px-4 pb-2 flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAllCategories(false);
                  navigate(`/products?category=${encodeURIComponent(cat)}`);
                }}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

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
              <li>
                <Link
                  to="/orderlist"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHeart />
                  Orders
                </Link>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate(userInfo ? "/profile" : "/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                <FaUser />
                {userInfo ? "Profile" : "Login"}
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaShoppingCart />
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
