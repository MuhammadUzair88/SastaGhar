import React from "react";

const RecommendedCards = ({ title, price, img }) => {
  return (
    <>
      {/* Mobile Card */}
      <div className="w-full max-w-[160px] h-60 block md:hidden bg-white rounded-md border border-zinc-200 flex flex-col items-center  gap-2">
        <div className="w-36 h-36  flex items-center justify-center rounded">
          <img src={img} alt={title} className="w-28 h-32 object-cover" />
        </div>
        <div className="text-zinc-900 text-base font-medium">{price}</div>
        <div className="text-gray-400 text-xs text-center">{title}</div>
      </div>

      {/* Desktop Card */}
      <div className="w-full max-w-[220px] h-80 hidden md:flex flex-col items-center bg-white rounded-md border border-neutral-200 p-3 gap-3">
        <div className="w-52 h-52 bg-neutral-100 flex items-center justify-center rounded">
          <img src={img} alt={title} className="w-36 h-44 object-cover" />
        </div>
        <div className="text-zinc-900 text-base font-medium">{price}</div>
        <div className="text-gray-400 text-base text-center">{title}</div>
      </div>
    </>
  );
};

export default RecommendedCards;
