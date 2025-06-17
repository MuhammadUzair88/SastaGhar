import React, { useState } from "react";

const CartItemCard = (props) => {
  const { title, size, color, material, seller, price, quantity, image } = props;
  const [quantitys, setQuantity] = useState(2); // local quantity for mobile

  const decrement = () => {
    if (quantitys > 1) setQuantity(prev => prev - 1);
  };

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <div className="flex gap-4 border-b py-4 items-start">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-cover rounded border border-gray-100 shadow"
      />

      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">
          Size: {size}, Color: {color}, Material: {material}
        </p>
        <p className="text-xs text-gray-500 mb-1">Seller: {seller}</p>

        {/* ✅ Mobile quantity selector under description */}
        <div className="block md:hidden mb-2">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-28 h-10">
            <button
              onClick={decrement}
              className="w-1/3 text-gray-500 hover:bg-gray-100 text-xl font-light border-r border-gray-300"
            >
              −
            </button>
            <div className="w-1/3 text-center text-lg font-medium">
              {quantitys}
            </div>
            <button
              onClick={increment}
              className="w-1/3 text-gray-500 hover:bg-gray-100 text-xl font-light border-l border-gray-300"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-3">
            <button className="hidden md:block text-red-500 text-xs hover:underline bg-white border border-gray-200 rounded p-1">
              Remove
            </button>
            <button className="hidden md:block text-blue-500 text-xs hover:underline bg-white border border-gray-200 rounded p-1">
              Save for later
            </button>
          </div>

          <select
            className="hidden md:block border border-gray-200 shadow text-xs px-2 py-1 rounded"
            value={quantity}
            onChange={() => {}} // optional: handle changes
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Qty: {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="font-medium text-sm whitespace-nowrap">
        ${(price * quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartItemCard;
