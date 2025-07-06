import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

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

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 px-4 sm:px-8 lg:px-16 text-gray-700 text-[15px]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo + Description */}
        <div className="col-span-1 lg:col-span-2">
          <Link to="/" className="inline-block mb-4">
            <img src="/Logo (2).png" className="w-32" alt="logo" />
          </Link>
          <p className="text-gray-600 leading-relaxed max-w-md">
            Your go-to destination for everyday essentials and exclusive
            collections. Explore a wide range of categories curated just for
            you.
          </p>
          <div className="flex gap-4 mt-6 text-gray-600 text-lg">
            <a
              href="https://www.facebook.com/share/16x5CQ22tx/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/923316309905"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-600"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/sastagharofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@sasta.ghar?_t=ZS-8xmLiLA4zFH&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-black"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-zinc-900 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="/products" className="hover:text-blue-600">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/orderlist" className="hover:text-blue-600">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-600">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-600">
                Login / Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <h4 className="text-zinc-900 font-semibold mb-3">Categories</h4>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-600 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="hover:underline hover:text-blue-600"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-4 border-t border-gray-100 text-sm flex flex-col sm:flex-row justify-between items-center text-zinc-500">
        <div>© {new Date().getFullYear()} Sastaghar. All rights reserved.</div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span>Language:</span>
          <span className="text-zinc-800 font-medium">English</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
