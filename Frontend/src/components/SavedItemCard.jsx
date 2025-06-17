import React from "react";
import { FaCartPlus } from "react-icons/fa";

function SavedItemCard(props) {
  return (
    <div className="w-full md:w-48 bg-white border border-white rounded p-3 flex flex-row md:flex-col items-start gap-3 mb-4">
      {/* Image - Left on mobile (25%), top on desktop */}
      <img
        src={props.image}
        alt="Product"
        className="w-1/4 md:w-full h-24 md:h-32 object-contain rounded"
      />

      {/* Content - Right on mobile, bottom on desktop */}
      <div className="w-3/4 md:w-full">
        <p className="font-semibold text-sm text-black">${props.price.toFixed(2)}</p>
        <p className="text-xs text-gray-800 mb-2">
          {props.title} - {props.description}
        </p>
        <div className="">
  {/* Desktop-only button */}
  <button className="hidden md:flex bg-white border border-gray-100 p-1 items-center gap-1 text-sm text-blue-600 rounded font-medium hover:text-gray-900 hover:bg-blue-500">
    <FaCartPlus size={14} />
    Move to cart
  </button>

  {/* Mobile-only button */}
  <button className="flex md:hidden bg-white border border-gray-100 p-1 items-center gap-1 text-sm text-blue-600 rounded font-medium hover:text-white hover:bg-blue-500">
    <FaCartPlus size={14} />
    Move to cart
  </button>
</div>

      </div>
    </div>
  );
}

export default SavedItemCard;
