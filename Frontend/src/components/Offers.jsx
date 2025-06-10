import React from "react";

const Offers = () => {
  const products = [
    {
      title: "Smart Watches",
      img: "https://charcoal.com.pk/cdn/shop/files/DSC03747.jpg?v=1742301648",
      discount: "-25%",
    },
    {
      title: "Headphones",
      img: "https://cdn.pixabay.com/photo/2016/11/29/12/54/headphones-1868612_1280.jpg",
      discount: "-25%",
    },
    {
      title: "Macbook",
      img: "https://cdn.pixabay.com/photo/2016/12/20/21/43/macbook-1928142_1280.jpg",
      discount: "-25%",
    },
  ];

  return (
    <div className="w-full px-4 py-6">
      {/* Combined layout on lg */}
      <div className="flex flex-col gap-4 lg:flex-row lg:border lg:border-[#DEE2E7] lg:rounded-md lg:overflow-hidden">
        {/* Left Side: Deals & Timer */}
        <div className="flex flex-col  gap-4 px-4 py-3 lg:min-w-[220px] lg:border-r lg:border-[#DEE2E7]">
          <div>
            <h1 className="font-semibold text-xl text-[#1C1C1C]">
              Deals and offers
            </h1>
            <p className="text-gray-500 text-sm">Electronic equipments</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { value: "13", label: "Hour" },
              { value: "34", label: "Min" },
              { value: "56", label: "Sec" },
            ].map((time, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-[#EFF2F4] rounded text-center text-[#8B96A5] text-sm"
              >
                <div className="font-semibold">{time.value}</div>
                <div className="text-xs">{time.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Cards */}
        <div className="flex overflow-x-auto lg:overflow-visible divide-x divide-y divide-[#DEE2E7]">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col justify-center items-center p-4 min-w-[140px] sm:min-w-[160px]"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-[90px] h-[90px] object-cover mb-2 rounded"
              />
              <h2 className="text-sm font-medium text-[#1C1C1C] text-center mb-1">
                {product.title}
              </h2>
              <span className="text-[#EB001B] bg-red-200 text-xs px-3 py-1 rounded-full font-semibold">
                {product.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
