import React from "react";

const RecommendedCards = ({ name, price, image }) => {
  return (
    <>
      {/* Mobile Card */}
      <div className="w-full max-w-[160px] h-60 block md:hidden  rounded-md border border-zinc-200 flex flex-col items-center  gap-2">
        <div className="w-36 h-36  flex items-center justify-center rounded">
          <img src={image} alt={name} className="w-28 h-32 object-cover" />
        </div>
        <div className="text-zinc-900 text-base font-medium">{price}</div>
        <div className="text-gray-400 text-xs text-center">{name}</div>
      </div>

      {/* Desktop Card */}
      <div className="w-full max-w-[220px] h-80 hidden md:flex flex-col items-center  rounded-md border border-neutral-200 p-3 gap-3">
        <div className="w-52 h-52 bg-neutral-100 flex items-center justify-center rounded">
          <img src={image} alt={name} className="w-36 h-44 object-cover" />
        </div>
        <div className="text-zinc-900 text-base font-medium">{price}</div>
        <div className="text-gray-400 text-base text-center">{name}</div>
      </div>
    </>
  );
};

export default RecommendedCards;
