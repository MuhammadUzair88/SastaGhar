import React from "react";
import CartItemCard from "../components/CartItemCard";
import SavedItemCard from "../components/SavedItemCard";
import { FaStripe, FaPaypal, FaCreditCard } from "react-icons/fa";
import { useState } from "react";

const AddToCart = () => {
   

  const cartItems = [
    {
      title: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artel Market",
      price: 78.99,
      quantity: 9,
      image: "./images/photo.png",
    },
    {
      title: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Best factory LLC",
      price: 39.0,
      quantity: 3,
      image: "./images/photo.png",
    },
    {
      title: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artel Market",
      price: 170.5,
      quantity: 1,
      image: "./images/photo.png",
    },
  ];

  const savedItems = [
    {
      image: "./images/photo.png",
      price: 99.5,
      title: "GoPro HERO6 4K Action Camera",
      description: "Black",
    },
    {
      image: "./images/photo.png",
      price: 99.5,
      title: "GoPro HERO6 4K Action Camera",
      description: "Black",
    },
    {
      image: "./images/photo.png",
      price: 99.5,
      title: "GoPro HERO6 4K Action Camera",
      description: "Black",
    },
    {
      image: "./images/photo.png",
      price: 99.5,
      title: "GoPro HERO6 4K Action Camera",
      description: "Black",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 60.0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

  return (
    <div className="bg-gray-100">
    <div className="w-full md:w-3/4 mx-auto md:p-10 space-y-10 bg-gray-100">
  {/* Top Section - Cart and Summary */}
  <div className="flex w-full gap-6">
    {/* Left - Cart Items (75% of 75%) */}
    <div className="w-full p-2 md:w-3/4 bg-white shadow rounded  md:p-6">
      <h2 className=" hidden md:block text-lg font-bold mb-4 ">My cart ({cartItems.length})</h2>
      {cartItems.map((item, index) => (
        <CartItemCard  key={index} {...item} />
      ))}
      <div className="flex justify-between mt-6">
        <button className="hidden md:block px-4 py-2 bg-blue-600 text-white text-sm rounded">
          Back to shop
        </button>
        <button className="hidden md:block px-4 py-2 text-sm border border-gray-300 rounded text-red-600">
          Remove all
        </button>
      </div>
    </div>

    {/* Right - Summary Box (25% of 75%) */}
    <div className=" hidden md:block w-1/4 h-22 bg-white shadow rounded p-6">
      <div className="mb-4">
        <p className=" hidden md:block text-sm  font-medium mb-1">Have a coupon?</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add coupon"
            className="border border-gray-200 px-2 py-1 w-full text-sm rounded"
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Apply
          </button>
        </div>
      </div> 

      <div className="w-[200px] text-sm border-gray-200 px-2 space-y-1 bg-white rounded">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-black">
          <span>Discount:</span>
          <span className="text-red-500">- ${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-black-500">
          <span>Tax:</span>
          <span className="text-green-400">+ ${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t pt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded text-sm">
          Checkout
        </button>

        <div className="mt-4">
          
          <div className="flex justify-center gap-4 text-2xl text-gray-600">
            <FaStripe className="hover:text-purple-600 cursor-pointer" />
            <FaPaypal className="hover:text-blue-600 cursor-pointer" />
            <FaCreditCard className="hover:text-yellow-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="hidden md:block w-3/4 mx-auto mt-8 flex justify-between gap-4">
  {/* Card 1 */}
  <div className="flex items-center gap-3 bg-gray-100  px-6 py-4 w-full">
    <div className="bg-gray-200 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v.01M20.664 15.23l-1.5-1.5a1 1 0 00-1.414 0L16 15.48"
        />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-sm">Secure payment</p>
      <p className="text-gray-500 text-xs">Have you ever finally just</p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="flex items-center gap-3 bg-gray-100 px-6 py-4 w-full">
    <div className="bg-gray-200 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 20H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-sm">Customer support</p>
      <p className="text-gray-500 text-xs">Have you ever finally just</p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="w-4/4 flex items-center gap-3 bg-gray-100 px-6 py-4">
    <div className="bg-gray-200 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l1-2H6l1 2zm1-4h8m4-4H5.4l-.8-2H1"
        />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-sm">Free delivery</p>
      <p className="text-gray-500 text-xs">Have you ever finally just</p>
    </div>
  </div>
</div>
<div className="p-2 bg-white block md:hidden w-full max-w-xs mx-auto border border-gray-300 rounded-lg p-4 font-sans">
      <div className="mb-3 text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Items (3):</span>
          <span>$32.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>$7.00</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total:</span>
        <span>$220.00</span>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-base font-medium">
        Checkout (3 items)
      </button>
    </div>



      {/* Bottom Section - Saved Items */}
      <div className=" w-4/4 mx-auto bg-white shadow border border-gray-200 rounded p-6">
  <h3 className="font-medium  mb-4">Saved for later</h3>
  <div className="grid md:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
    {savedItems.map((item, index) => (
      <SavedItemCard
        key={index}
        image={item.image}
        price={item.price}
        title={item.title}
        description={item.description}
      />
    ))}
  </div>
</div>

 {/* Discount Banner */}
 <div className="hidden md:block w-4/4 mx-auto mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-md flex items-center justify-between">
  <div>
    <p className="text-xl font-semibold">Super discount on more than 100 USD</p>
    <p className="text-sm text-white/70">Have you ever finally just write dummy info</p>
  </div>
  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
    Shop now
  </button>
</div>
</div>
</div>

    
  );
};

export default AddToCart;



