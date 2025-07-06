import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const OrderProductCard = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const { addToCart } = useCart();

  // Reset selectedImage when product changes
  useEffect(() => {
    setSelectedImage(product.image[0]);
  }, [product]);

  const salePrice = product.onSale
    ? product.price - (product.price * (product.salePercentage || 0)) / 100
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Thumbnail */}
      <div className="flex gap-4 overflow-x-auto lg:flex-col w-full lg:w-[120px]">
        {product.image.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 flex-shrink-0 object-cover rounded-md border cursor-pointer ${
              selectedImage === img ? "border-black" : "border-gray-200"
            }`}
            alt=""
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <div className="flex items-center text-sm text-red-500 gap-1">
          {"★".repeat(4)}
          <span className="text-gray-400">★</span>
          <span className="ml-1 text-gray-600">(122)</span>
        </div>

        {product.onSale ? (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-black">
              ₨{salePrice.toLocaleString()}
            </span>
            <span className="line-through text-gray-400 text-xl">
              ₨{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-red-500">
              -{product.salePercentage}% OFF
            </span>
          </div>
        ) : (
          <div className="text-3xl font-bold text-black">
            ₨{product.price.toLocaleString()}
          </div>
        )}

        <p className="text-gray-600 leading-relaxed text-sm">
          {product.description}
        </p>

        <button
          onClick={() => addToCart(product._id)}
          className="mt-4 bg-black text-white px-6 py-3 text-sm font-medium"
        >
          ADD TO CART
        </button>

        <div className="pt-4 text-sm text-gray-500 space-y-1">
          <p>100% Original Product</p>
          <p>Cash On Delivery Is Available On This Product</p>
          <p className="font-semibold text-blue-400">
            Easy Return And Exchange Policy Within 7 Days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
