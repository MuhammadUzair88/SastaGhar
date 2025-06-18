import React from "react";

const Gadgets = () => {
  const categories = [
    {
      title: "Smart watches",
      price: "From USD 19",
      img: "/watches.jpeg",
    },
    {
      title: "Soft chairs",
      price: "From USD 19",
      img: "/chair.jpeg",
    },
    {
      title: "Kitchen utensils",
      price: "From USD 19",
      img: "/kitchen.jpeg",
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
    {
      title: "VR Headset",
      price: "From USD 19",
      img: "/VR.jpeg",
    },
    {
      title: "Bluetooth speaker",
      price: "From USD 19",
      img: "/headphones.jpeg",
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="xl:hidden">
        <h1 className="text-xl font-semibold p-2">Consumer Electronics</h1>
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
            src="/left-side.png"
            className="w-full h-full object-cover"
            alt="Banner"
          />
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

export default Gadgets;
