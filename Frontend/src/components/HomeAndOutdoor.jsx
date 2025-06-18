import React from "react";

const HomeAndOutdoor = () => {
  const categories = [
    {
      title: "Soft Chairs",
      price: "From USD 19",
      img: "/chair.jpeg",
    },
    {
      title: "Lamps",
      price: "From USD 19",
      img: "/lamp.jpeg",
    },
    {
      title: "Kitchen utensils",
      price: "From USD 19",
      img: "/kitchen.jpeg",
    },
    {
      title: "Pots",
      price: "From USD 19",
      img: "/pot.jpeg",
    },
    {
      title: "Kitchen mixer",
      price: "From USD 19",
      img: "/mixer.jpeg",
    },
    {
      title: "Blenders",
      price: "From USD 19",
      img: "/blender.jpeg",
    },
    {
      title: "Home appliance",
      price: "From USD 19",
      img: "/appliance.jpeg",
    },
    {
      title: "Coffee maker",
      price: "From USD 19",
      img: "/coffee.jpeg",
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="xl:hidden">
        <h1 className="text-xl font-semibold p-2">Home and outdoor</h1>
        <div className="flex overflow-x-auto border divide-x px-4 border-gray-300 divide-gray-300 bg-white">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[120px]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-[98px] h-[98px] rounded p-2"
              />
              <h2 className="text-sm font-medium">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden xl:flex w-full border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
        {/* Left Banner */}
        <div className="relative min-w-[280px]">
          <img
            src="/Group 969.png"
            className="w-full h-full object-cover"
            alt="Banner"
          />
          <div className="absolute top-0 p-4 flex flex-col justify-center gap-2">
            <h1 className="text-lg font-medium tracking-tighter">
              Home and <span>outdoor</span>
            </h1>
            <button className="px-4 py-2 tracking-tight text-sm bg-white shadow-sm rounded">
              Source now
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-px flex-grow divide-x divide-y divide-[#DEE2E7]">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white px-4 py-3"
            >
              <div>
                <h1 className="text-sm font-medium tracking-tight">
                  {item.title}
                </h1>
                <p className="text-gray-500 text-xs">{item.price}</p>
              </div>
              <img
                src={item.img}
                alt={item.title}
                className="w-[67px] h-[69px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAndOutdoor;
