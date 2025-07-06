import React, { useState, useEffect } from "react";

const CartItemCard = ({
  id,
  title,
  size,
  color,
  material,
  seller,
  price,
  quantity,
  image,
  otherServices,
  onQuantityChange,
  onRemove,
}) => {
  const [localQty, setLocalQty] = useState(quantity);

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  const decrement = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      onQuantityChange(newQty);
    }
  };

  const increment = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    onQuantityChange(newQty);
  };

  const handleDesktopQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    setLocalQty(newQty);
    onQuantityChange(newQty);
  };

  return (
    <div className="flex gap-4 border-b py-4 items-start">
      {Array.isArray(image) ? (
        // Show 4-image grid for otherServices
        <div className="grid grid-cols-2 gap-1 w-16 h-16">
          {image.map((img, index) => (
            <img
              key={index}
              src={img || "/fallback.png"}
              alt={`${title}-${index}`}
              className="w-full h-full object-cover rounded border border-gray-100 shadow"
            />
          ))}
        </div>
      ) : (
        <img
          src={image}
          alt={title}
          className="w-16 h-16 object-cover rounded border border-gray-100 shadow"
        />
      )}

      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        {otherServices && (
          <p className="text-[10px] text-green-600 bg-green-100 px-2 inline-block rounded-full mb-1">
            Extra Services Product
          </p>
        )}

        {/* Mobile quantity */}
        <div className="block md:hidden mb-2">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-28 h-10">
            <button
              onClick={decrement}
              className="w-1/3 text-gray-500 hover:bg-gray-100 text-xl font-light border-r border-gray-300"
            >
              −
            </button>
            <div className="w-1/3 text-center text-lg font-medium">
              {localQty}
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
            <button
              onClick={onRemove}
              className="hidden md:block text-red-500 text-xs hover:underline bg-white border border-gray-200 rounded p-1"
            >
              Remove
            </button>
          </div>

          <select
            className="hidden md:block border border-gray-200 shadow text-xs px-2 py-1 rounded"
            value={localQty}
            onChange={handleDesktopQtyChange}
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
        ₨{(price * quantity).toLocaleString("en-PK")}
      </p>
    </div>
  );
};

export default CartItemCard;
