import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

const OrderProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  const toggleLike = () => setLiked(!liked);
  const handleAddToCart = () => {
    if (!product?._id) return;
    addToCart(product._id);
  };

  const images = product?.image || [
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 border rounded-md border-white">
      {/* Main Image */}
      <div className="flex flex-col items-center">
        <img
          src={images[0]}
          alt={product?.name || "Product Image"}
          className="w-full object-cover rounded"
        />

        {/* Thumbnails */}
        <div className="hidden lg:flex space-x-2 mt-4 flex-wrap">
          {images.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover rounded cursor-pointer border"
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        {/* Mobile Rating */}
        <div className="flex sm:hidden items-center gap-2 text-yellow-500 text-sm my-1">
          <span>
            ★★★★<span className="text-gray-200">★</span>
          </span>
          <span className="text-gray-600 text-sm">• 32 reviews</span>
          <span className="text-gray-400">• 154 sold</span>
        </div>

        {/* Product Name */}
        <h2 className="text-lg font-medium">
          {product?.name || "Sample Product"}
        </h2>

        {/* Desktop Rating */}
        <div className="hidden sm:flex items-center gap-2 text-yellow-500 text-sm my-1">
          <span>
            ★★★★<span className="text-gray-200">★</span>
          </span>
          <span className="text-gray-600 text-sm">• 32 reviews</span>
          <span className="text-gray-400">• 154 sold</span>
        </div>

        {/* Pricing Tiers */}
        <div className="mt-4 bg-orange-100 hidden sm:flex">
          <div className="flex flex-row flex-wrap gap-6 p-2">
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-red-600">
                ${product?.price || 100}.00
              </p>
              <span className="text-sm text-gray-500">(50–100 pcs)</span>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-orange-600">
                ${(product?.price || 100) - 8}.00
              </p>
              <span className="text-sm text-gray-500">(100–700 pcs)</span>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-green-600">
                ${(product?.price || 100) - 20}.00
              </p>
              <span className="text-sm text-gray-500">(700+ pcs)</span>
            </div>
          </div>
        </div>

        {/* Mobile price */}
        <p className="block sm:hidden text-xl font-semibold text-red-600">
          ${product?.price || 100}.00{" "}
          <span className="text-sm font-normal text-gray-400">
            (50-100 pcs)
          </span>
        </p>

        {/* Mobile Buttons */}
        <div className="mt-3 flex flex-col gap-2 sm:hidden">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
            Send inquiry
          </button>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
          >
            Add to Cart
          </button>

          <button
            onClick={toggleLike}
            className="bg-white border border-gray-200 rounded p-1 flex items-center justify-center"
          >
            <Heart
              className="w-6 h-6 transition duration-200"
              fill={liked ? "#3B82F6" : "none"}
              color={liked ? "#3B82F6" : "#3B82F6"}
            />
          </button>
        </div>

        {/* Desktop Add to Cart */}
        <div className="mt-4 hidden sm:flex">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm"
          >
            Add to Cart
          </button>
        </div>

        {/* Product details for Desktop */}
        <ul className="mt-4 text-sm text-gray-700 space-y-1 hidden sm:block">
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Price:</strong>
            <span>Negotiable</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Type:</strong>
            <span>{product?.type || "Classic shoes"}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Material:</strong>
            <span>{product?.material || "Plastic material"}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Design:</strong>
            <span>{product?.design || "Modern nice"}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Customization:</strong>
            <span>{product?.customization || "Custom logo & packages"}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Protection:</strong>
            <span>{product?.protection || "Refund Policy"}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-gray-400 w-32">Warranty:</strong>
            <span>{product?.warranty || "2 years full warranty"}</span>
          </li>
        </ul>

        {/* Mobile Description */}
        <div className="block sm:hidden">
          <ul className="mt-4 text-sm text-gray-600 space-y-1">
            <li>
              <strong className="font-normal text-gray-400">Condition </strong>{" "}
              Brand new
            </li>
            <li>
              <strong className="font-normal text-gray-400">Material </strong>{" "}
              {product?.material || "Plastic"}
            </li>
            <li>
              <strong className="font-normal text-gray-400">Category </strong>{" "}
              {product?.category || "Shoes"}
            </li>
            <li>
              <strong className="font-normal text-gray-400">Item num </strong>{" "}
              {product?._id || "N/A"}
            </li>
          </ul>
          <p className="mt-2 text-sm text-black line-clamp-3">
            {product?.description?.slice(0, 100) ||
              "High-quality product perfect for daily use, designed to fit your needs."}
            ...
          </p>
          <p className="cursor-pointer text-blue-700 font-normal">Read more</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
