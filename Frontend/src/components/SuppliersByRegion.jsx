import React from "react";

const suppliers = [
  { name: "Arabic Emirates", domain: "shopname.ae", code: "ae" },
  { name: "Australia", domain: "shopname.ae", code: "au" },
  { name: "United States", domain: "shopname.ae", code: "us" },
  { name: "Russia", domain: "shopname.ru", code: "ru" },
  { name: "Italy", domain: "shopname.it", code: "it" },
  { name: "Denmark", domain: "denmark.com.dk", code: "dk" },
  { name: "France", domain: "shopname.com.fr", code: "fr" },
  { name: "Arabic Emirates", domain: "shopname.ae", code: "ae" },
  { name: "China", domain: "shopname.ae", code: "cn" },
  { name: "Great Britain", domain: "shopname.co.uk", code: "gb" },
];

const SuppliersByRegion = () => {
  return (
    <div className="w-full px-4 md:px-10 xl:px-14 py-6 bg-white">
      <h2 className="text-lg md:text-xl font-semibold mb-6 text-zinc-800">
        Suppliers by region
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {suppliers.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img
              src={`https://flagcdn.com/w40/${item.code}.png`}
              alt={item.name}
              className="w-6 h-4 object-cover rounded-sm"
              loading="lazy"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm text-zinc-900 font-medium">
                {item.name}
              </span>
              <span className="text-xs text-gray-500">{item.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersByRegion;
