import React from "react";
import { FaCartPlus } from "react-icons/fa";

function SavedItemCard({ image, price, title, onMoveToCart }) {
  return (
    <div className="w-full md:w-48 bg-white border border-white rounded p-3 flex flex-row md:flex-col items-start gap-3 mb-4">
      <img
        src={image}
        alt="Product"
        className="w-1/4 md:w-full h-24 md:h-32 object-contain rounded"
      />

      <div className="w-3/4 md:w-full">
        <p className="font-semibold text-sm text-black">${price.toFixed(2)}</p>
        <p className="text-xs text-gray-800 mb-2">{title}</p>
        <div>
          {/* Move to cart button */}
          <button
            onClick={onMoveToCart}
            className="flex bg-white border border-gray-100 p-1 items-center gap-1 text-sm text-blue-600 rounded font-medium hover:text-white hover:bg-blue-500 transition-colors"
          >
            <FaCartPlus size={14} />
            Move to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedItemCard;
