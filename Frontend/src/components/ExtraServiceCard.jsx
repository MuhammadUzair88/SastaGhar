import React from "react";
import { Card, CardContent } from "./card";
import { Link } from "react-router-dom";

const ExtraServiceCard = ({ product, viewMode }) => {
  const discountedPrice = product.onSale
    ? product.price - (product.price * (product.salePercentage || 0)) / 100
    : null;

  const imagesToShow = product.image.slice(0, 4);
  const isList = viewMode === "list";

  return (
    <Card
      className={`relative bg-white rounded-lg shadow-sm p-3 ${
        isList ? "flex flex-row gap-4" : ""
      }`}
    >
      {/* 💡 Extra Service Badge */}
      <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
        Extra Service
      </span>

      {/* Image Grid */}
      <div
        className={`grid gap-1 ${
          imagesToShow.length === 1
            ? "grid-cols-1"
            : imagesToShow.length === 2
            ? "grid-cols-2"
            : "grid-cols-2"
        } ${
          isList ? "w-40 h-40 min-w-40" : "w-full h-48 sm:h-52 md:h-56 lg:h-60"
        }`}
      >
        {imagesToShow.map((img, index) => (
          <img
            key={index}
            src={img || "/fallback.png"}
            alt={`Product ${index}`}
            className="w-full h-full object-cover rounded"
            style={{ aspectRatio: "1 / 1" }}
          />
        ))}
      </div>

      <CardContent className={`flex-1 ${isList ? "pl-4 py-0" : "pt-2 px-1"}`}>
        <h3 className="font-medium text-sm sm:text-base line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 my-1">
          {product.onSale ? (
            <>
              <span className="line-through text-gray-400 text-sm">
                ₨{product.price.toLocaleString("en-PK")}
              </span>
              <span className="font-semibold text-green-600">
                ₨{discountedPrice.toLocaleString("en-PK")}
              </span>
              <span className="text-xs text-red-500 bg-red-100 px-1 rounded">
                -{product.salePercentage}%
              </span>
            </>
          ) : (
            <span className="font-semibold text-green-600">
              ₨{product.price.toLocaleString("en-PK")}
            </span>
          )}
        </div>

        {isList && (
          <p className="text-xs text-gray-600 mt-2 hidden sm:block">
            {product.description?.substring(0, 100)}...
          </p>
        )}

        <Link
          to={`/product/${product._id}`}
          className="text-blue-600 font-semibold text-xs sm:text-sm mt-1 inline-block"
        >
          View details
        </Link>
      </CardContent>
    </Card>
  );
};

export default ExtraServiceCard;
