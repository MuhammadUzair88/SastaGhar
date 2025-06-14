import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white w-full px-4 sm:px-8 lg:px-16 pt-10 pb-4 text-[16px] relative">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Logo and description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://img.icons8.com/fluency/48/shopping-bag.png"
              alt="Brand Logo"
              className="w-8 h-8"
            />
            <span className="text-blue-600 text-xl font-bold">Brand</span>
          </div>
          <p className="text-neutral-600 max-w-[288px] leading-normal">
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="flex gap-3 mt-6 text-gray-500 text-xl">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-zinc-900 font-medium mb-2">About</h4>
          <ul className="text-gray-400 space-y-1">
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Partnership */}
        <div>
          <h4 className="text-zinc-900 font-medium mb-2">Partnership</h4>
          <ul className="text-gray-400 space-y-1">
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-zinc-900 font-medium mb-2">Information</h4>
          <ul className="text-gray-400 space-y-1">
            <li>Help Center</li>
            <li>Money Refund</li>
            <li>Shipping</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* For Users */}
        <div>
          <h4 className="text-zinc-900 font-medium mb-2">For users</h4>
          <ul className="text-gray-400 space-y-1">
            <li>Login</li>
            <li>Register</li>
            <li>Settings</li>
            <li>My Orders</li>
          </ul>

          <h4 className="text-zinc-900 font-medium mt-6 mb-2">Get app</h4>
          <div className="space-y-2">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29.png"
                alt="App Store"
                className="w-32 h-10 object-contain"
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-32 h-10 object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-zinc-200 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-600">
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          © 2023 Ecommerce.
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/us.svg"
            alt="US Flag"
            className="w-6 h-4"
          />
          <span>English</span>
          <div className="w-3 h-2 bg-zinc-900 ml-2" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
