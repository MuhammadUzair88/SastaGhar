import React from "react";
import { Link } from "react-router-dom";

const RecommendedCards = ({
  _id,
  name,
  price,
  image,
  onSale,
  salePercentage,
  category,
}) => {
  const discountedPrice = onSale
    ? price - (price * (salePercentage || 0)) / 100
    : null;

  return (
    <Link
      to={`/product/${_id}`}
      className="group w-full max-w-[220px] transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="flex flex-col h-80 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Image */}
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={image || "/fallback.png"}
            alt={name}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-2 flex flex-col justify-center text-center">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
            {name}
          </h3>

          <p className="text-xs text-gray-500 mt-1">{category}</p>

          <div className="mt-2 text-sm flex justify-center items-center gap-2">
            {onSale ? (
              <>
                <span className="line-through text-gray-400 text-xs">
                  ₨{price.toLocaleString("en-PK")}
                </span>
                <span className="text-green-600 font-semibold">
                  ₨{discountedPrice.toLocaleString("en-PK")}
                </span>
                <span className="text-[10px] text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
                  -{salePercentage}%
                </span>
              </>
            ) : (
              <span className="text-green-700 font-semibold">
                ₨{price.toLocaleString("en-PK")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendedCards;
