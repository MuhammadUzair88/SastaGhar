import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Offers from "../components/Offers";
import HomeAndOutdoor from "../components/HomeAndOutdoor";
import QuoteRequest from "../components/QuoteRequest";
import RecommendedCards from "../components/RecommendedCards";
import ExtraServices from "../components/ExtraServices";
import SuppliersByRegion from "../components/SuppliersByRegion";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import Gadgets from "../components/Gadgets";

const Home = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/product/list`
        );
        setRecommendedItems(res.data.products);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen space-y-10 pb-10 bg-gray-100 mt-4">
      {/* Mobile + Tablet View */}
      <div className="xl:hidden relative w-full">
        <img
          src="/Mask group.png"
          className="w-full h-[220px] object-cover"
          alt="Trending banner"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-6 top-6 md:top-10 md:left-10 flex flex-col gap-2 z-10">
          <div className="text-zinc-100 text-xl md:text-2xl font-light">
            Latest <span className="font-normal">trending</span>
          </div>
          <div className="text-white text-xl md:text-2xl font-semibold">
            Electronic items
          </div>
          <button
            className="bg-white text-blue-600 text-sm font-medium px-4 py-1 rounded shadow mt-2 w-fit"
            onClick={() => navigate(`/products?category=Electronics`)}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Desktop Banner View */}
      <div className="hidden xl:flex justify-center px-4 md:px-10 xl:px-14">
        <div className="w-full flex gap-4 shadow bg-white p-4 rounded h-[360px]">
          {/* Left Sidebar Categories */}
          <div className="w-1/4 h-full flex flex-col justify-between">
            <div className="flex flex-col space-y-2">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(item);
                    navigate(`/products?category=${encodeURIComponent(item)}`);
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition duration-200 ${
                    selectedCategory === item
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Center Banner */}
          <div className="w-1/2 h-full relative rounded-md flex items-center justify-center">
            <img
              src="/Mask group.png"
              alt="Electronics"
              className="absolute w-full h-full object-cover rounded-md"
            />
            <div className="z-10 absolute right-[450px] px-6">
              <h1 className="text-[#1C1C1C] font-light text-2xl flex flex-col justify-center">
                Latest trending{" "}
                <span className="font-bold">Electronic items</span>
              </h1>
              <button
                className="mt-4 bg-white text-[#0D6EFD] shadow w-[120px] h-[35px] rounded"
                onClick={() => navigate(`/products?category=Electronics`)}
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/4 h-full flex flex-col justify-between">
            <div className="bg-[#F5F5F5] p-4 rounded text-center">
              <p className="text-sm text-gray-700">
                Hi, user
                <br />
                let’s get started
              </p>
              <button className="mt-2 w-full bg-[#0D6EFD] text-white py-1 rounded">
                Join now
              </button>
              <button className="mt-2 w-full border border-gray-300 text-[#0D6EFD] py-1 rounded">
                Log in
              </button>
            </div>
            <div className="bg-orange-400 text-white text-sm text-center p-4 rounded">
              Get US $10 off
              <br />
              with a new supplier
            </div>
            <div className="bg-cyan-600 text-white text-sm text-center p-4 rounded">
              Send quotes with
              <br />
              supplier preferences
            </div>
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="px-4 md:px-10 xl:px-14">
        <Offers />
      </div>

      {/* Home and Outdoor */}
      <div className="px-4 md:px-10 xl:px-14">
        <HomeAndOutdoor />
      </div>

      {/* Gadgets */}
      <div className="px-4 md:px-10 xl:px-14">
        <Gadgets />
      </div>

      {/* Quote Request */}
      <div className="px-4 md:px-10 xl:px-14">
        <QuoteRequest />
      </div>

      {/* Recommended Cards */}
      <div className="px-4 md:px-10 xl:px-14">
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          Recommended Cards
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 justify-items-center">
          {recommendedItems.map((item, index) => (
            <RecommendedCards
              key={index}
              name={item.name}
              price={item.price}
              image={item.image[0]}
            />
          ))}
        </div>
      </div>

      {/* Extra Services */}
      <div className="px-4 md:px-10 xl:px-14">
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          Our extra services
        </h2>
        <ExtraServices />
      </div>

      {/* Suppliers by Region */}
      <div className="px-4 md:px-10 xl:px-14">
        <SuppliersByRegion />
      </div>

      {/* Newsletter & Footer */}
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Home;
