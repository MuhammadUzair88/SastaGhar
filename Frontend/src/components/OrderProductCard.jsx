import React from 'react';
import { useState } from 'react';
import { Star, Heart, LayoutGrid, List } from "lucide-react";
import { MdOutlineComment } from "react-icons/md";

const OrderProductCard = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  const images = [
    "./images/photo.png",
    "./images/photo.png",
    "./images/photo.png",
    "./images/photo.png"
    
  ];
    
  return (

    <div className="flex flex-col lg:flex-row gap-6 p-4 border rounded-md border-white">
    {/* Main Image */}
    <div className="flex flex-col items-center">
      <img
        src="./images/photo.png"
        alt="Product"
        className="w-full h-48 object-cover rounded lg:w-[310px]"
      />
  
      {/* Thumbnails (Hidden on mobile) */}
      <div className="hidden lg:flex space-x-2 mt-4 flex-wrap">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className="w-16 h-16 object-cover rounded cursor-pointer border"
          />
        ))}
      </div>
    </div>
    <div className="p-4 border-b border-gray-200">
    <div className="flex sm:hidden items-center gap-2 text-yellow-500 text-sm my-1">
    <span className='text-yellow-500'>★★★★<span className='text-gray-200'>★</span></span>
  <span className="text-gray-600 text-sm">• 32 reviews</span>
  <span className="text-gray-400">• 154 sold</span>
</div>

          <h2 className="text-lg font-medium">Product name goes here</h2>
          <div className="hidden sm:flex items-center gap-2 text-yellow-500 text-sm my-1">
  <span className='text-yellow-500'>★★★★<span className='text-gray-200'>★</span></span>
  <span className="text-gray-600 text-sm">• 32 reviews</span>
  <span className="text-gray-400">• 154 sold</span>
</div>
<div className="mt-4 bg-orange-100 hidden sm:flex">
  <div className="flex flex-row flex-wrap gap-6 p-2">
    <div className="flex flex-col items-start">
      <p className="text-lg font-semibold text-red-600 ">$98.00</p>
      <span className="text-sm text-gray-500">(50–100 pcs)</span>
    </div>
    <div className="flex flex-col items-start">
      <p className="text-lg font-semibold text-orange-600">$90.00</p>
      <span className="text-sm text-gray-500">(100–700 pcs)</span>
    </div>
    <div className="flex flex-col items-start">
      <p className="text-lg font-semibold text-green-600">$78.00</p>
      <span className="text-sm text-gray-500">(700+ pcs)</span>
    </div>
  </div>
</div>


          
          <p className="block sm:hidden text-xl font-semibold text-red-600">$129.95 <span className="text-sm font-normal text-gray-400">(50-100 pcs)</span></p>
          <div className="mt-3 flex items-center justify-between block sm:hidden">
  <button className="w-2/3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
    Send inquiry
  </button>
  <button onClick={toggleLike} className="bg-white border border-gray-200 rounded p-1">
      <Heart
        className="w-8 h-8 transition duration-200"
        fill={liked ? '#3B82F6' : 'none'}       // fills the heart inside
        color={liked ? '#3B82F6' : '#3B82F6'}    // outlines the heart in blue either way
      />
    </button>
</div>


<ul className="mt-4 text-sm text-gray-700 space-y-1 hidden sm:block">
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Price:</strong>
    <span className="text-center flex-1">Negotiable</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Type:</strong>
    <span className="text-center flex-1">Classic shoes</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Material:</strong>
    <span className="text-center flex-1">Plastic material</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Design:</strong>
    <span className="text-center flex-1">Modern nice</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Customization:</strong>
    <span className="text-center flex-1">Customized logo and design custom packages</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Protection:</strong>
    <span className="text-center flex-1">Refund Policy</span>
  </li>
  <li className="flex justify-between">
    <strong className="text-gray-400 w-32">Warranty:</strong>
    <span className="text-center flex-1">2 years full warranty</span>
  </li>
</ul>



<div className="block sm:hidden">
  <ul className="mt-4 text-sm text-gray-600 space-y-1">
    <li><strong className="font-normal text-gray-400">Condition </strong> Brand new</li>
    <li><strong className="font-normal text-gray-400">Material </strong> Plastic</li>
    <li><strong className="font-normal text-gray-400">Category </strong> Electronics, gadgets</li>
    <li><strong className="font-normal text-gray-400">Item num </strong> 23421</li>
  </ul>
  <p className="mt-2 text-sm text-black line-clamp-3">
    Info about edu item is an ideal companion for anyone engaged in learning. The drone provides precise and ...
  </p>
  <p className="cursor-pointer text-blue-700 font-normal">Read more</p>
</div>
        </div>
      </div>
    
  );
};

export default OrderProductCard;
