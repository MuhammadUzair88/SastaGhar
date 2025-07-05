import React from "react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();

  const categories = [
    { title: "Women & Men Clothes", img: "/cloths.jpeg" },
    { title: "Shoes", img: "/Shoes.jpg" },
    { title: "Cosmetics & Beauty", img: "/Cosmetics.jpg" },
    { title: "Mobile & Accessories", img: "/mobile.jpg" },
    { title: "Kitchenware", img: "/Khichen.jpg" },
    { title: "Babies & Toys", img: "/Toys.jpg" },
    { title: "Personal Care Products", img: "/care.jpg" },
    { title: "Gifts", img: "/gifts.jpg" },
    { title: "Watches", img: "/watches.jpeg" },
    { title: "Perfumes", img: "/perfumes.jpg" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 lg:flex-row lg:border lg:border-[#DEE2E7] lg:rounded-md lg:overflow-hidden bg-white">
        {/* Left Side: Heading with BG */}
        <div className="flex flex-col gap-4 px-4 py-3 lg:min-w-[220px] lg:border-r lg:border-[#DEE2E7]">
          <div
            className="w-full h-full bg-cover bg-center text-center flex items-center justify-center py-10 lg:py-0"
            style={{ backgroundImage: "url('/Category.jpg')" }}
          ></div>
        </div>

        {/* Right Side: Category Cards */}
        <div className="overflow-x-auto lg:overflow-visible w-full">
          <div className="flex gap-3 px-3 pb-4 lg:grid lg:grid-cols-5 lg:gap-0 divide-x lg:divide-x-0 lg:divide-y divide-[#DEE2E7]">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    `/products?search=&category=${encodeURIComponent(
                      category.title
                    )}`
                  )
                }
                className="cursor-pointer flex-shrink-0 lg:flex-shrink lg:w-full p-4 flex flex-col items-center min-w-[140px] sm:min-w-[160px] bg-white shadow-md rounded-md lg:shadow-none lg:rounded-none transition hover:bg-gray-50"
              >
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-[90px] h-[90px] object-cover mb-2 rounded"
                />
                <h2 className="text-sm font-semibold text-gray-800 text-center mb-1">
                  {category.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
