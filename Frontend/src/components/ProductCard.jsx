import React from "react";

const ProductCard = ({ image, price, title, description }) => {
  return (
    <div className="w-48 h-72 p-4 border border-white rounded-md shadow-sm hover:shadow-lg transition duration-300 bg-white ">
      <img
        src={image}
        alt={title}
        className=" w-32 h-40 object-contain mb-4"
      />
      <h3 className="text-xm font-semibold text-gray-800">${price}</h3>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default ProductCard;
