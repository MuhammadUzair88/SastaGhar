import React from "react";
import { Search, Package, Send, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Source from\nIndustry Hubs",
    img: "Mask group (2).png",
    icon: <Search size={16} />,
  },
  {
    title: "Customize Your\nProducts",
    img: "Mask group (3).png",
    icon: <Package size={16} />,
  },
  {
    title: "Fast, reliable shipping\nby ocean or air",
    img: "Mask group (4).png",
    icon: <Send size={16} />,
  },
  {
    title: "Product monitoring\nand inspection",
    img: "Mask group (5).png",
    icon: <ShieldCheck size={16} />,
  },
];

const ExtraServices = () => {
  return (
    <div className="flex flex-wrap gap-6 ">
      {services.map((service, index) => (
        <div key={index} className="w-72 h-48 relative">
          <div className="w-72 h-48 left-0 top-0 absolute rounded-md border border-neutral-200" />
          <div className="w-52 left-[20px] top-[136px] absolute justify-start text-zinc-900 text-base font-medium font-['Inter'] leading-snug whitespace-pre-line">
            {service.title}
          </div>

          <img
            className="w-72 h-28 left-0 top-0 absolute bg-neutral-300"
            src={service.img}
            alt="service"
          />
          <div className="w-14 h-14 left-[204px] top-[92px] absolute bg-blue-100 rounded-full outline outline-2 outline-white flex items-center justify-center">
            {service.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExtraServices;
