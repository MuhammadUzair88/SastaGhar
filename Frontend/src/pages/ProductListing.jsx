import React, { useState } from "react";
import { Card, CardContent } from "../components/card";
import { Star, Heart, LayoutGrid, List } from "lucide-react";
import { TfiAngleUp } from "react-icons/tfi";
import { TfiArrowLeft } from "react-icons/tfi";
import { CiFilter } from "react-icons/ci";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const dummyProducts = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title: [
    "Canon Camera EOS 200D",
    "GoPro HERO6 4K Action",
    "Apple iPhone 13 Mini ",
    "Sony Alpha a6400 ",
    "Samsung Galaxy S22 Ultra",
    "DJI Action 3 Standard Combo",
    "Nikon D5600 DSLR Camera",
  ][index % 7],
  price: `$${(998).toFixed(2)}`,
  originalPrice: `$${(1128).toFixed(2)}`,
  rating: 4 + (index % 2) + 0.5,
  orders: 100 + index * 10,
  freeShipping: index % 2 === 0,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: `/images/${(index % 3) + 1}.png`,
}));

const ProductListing = () => {
  const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
  const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
  const conditions = ["Any", "Refurbished", "Brand new", "Old items"];

  const [wishlist, setWishlist] = useState([]);
  const [view, setView] = useState("list");
  const [selectedRating, setSelectedRating] = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [gridLayout, setGridLayout] = useState(false);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-0 sm:p-8 bg-gray-100 min-h-screen">
      <div className="text-sm text-gray-400 font-Inter mb-4 hidden sm:block">
        Home {">"} Clothing {">"} Men's wear {">"} Summer clothing
      </div>

      <div className="flex gap-6 ">
        {/* Sidebar */}
        <div className="w-1/4 p-8 bg-white shadow-sm rounded hidden sm:block">
          <hr className="my-4" />
          <h2 className="font-medium text-lg mb-2">Category <TfiAngleUp className="inline-block float-right" /></h2>
          <ul className="space-y-1 text-gray-700">
            <li>Mobile accessory</li>
            <li>Electronics</li>
            <li>Smartphones</li>
            <li>Modern tech</li>
            <li className="text-blue-500 cursor-pointer">See all</li>
          </ul>

          <hr className="my-4" />
          <h2 className="font-semibold text-lg mb-2">Brands <TfiAngleUp className="inline-block float-right" /></h2>
          <ul className="space-y-1 text-gray-700">
            {brands.map((brand, index) => (
              <li key={index}>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {brand}
                </label>
              </li>
            ))}
            <li className="text-blue-500 cursor-pointer">See all</li>
          </ul>

          <hr className="my-4" />
          <h2 className="font-semibold text-lg mb-2">Features <TfiAngleUp className="inline-block float-right" /></h2>
          <ul className="space-y-1 text-gray-700">
            {features.map((feature, index) => (
              <li key={index}>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {feature}
                </label>
              </li>
            ))}
          </ul>

          <hr className="my-4" />
          <h2 className="font-semibold text-lg mb-2">Price range <TfiAngleUp className="inline-block float-right" /></h2>
          <div className="flex gap-2">
            <input type="text" placeholder="Min" className="w-1/2 p-1 border rounded" />
            <input type="text" placeholder="Max" className="w-1/2 p-1 border rounded" />
          </div>
          <button className="mt-2 w-full bg-white text-blue-600 font-semibold shadow p-1 rounded">Apply</button>

          <hr className="my-4" />
          <h2 className="font-semibold text-lg mb-2">Condition <TfiAngleUp className="inline-block float-right" /></h2>
          <ul className="space-y-1 text-gray-700">
            {conditions.map((condition, index) => (
              <li key={index}>
                <label className="inline-flex items-center">
                  <input type="radio" name="condition" className="mr-2" />
                  {condition}
                </label>
              </li>
            ))}
          </ul>

          <hr className="my-4" />
          <h2 className="font-semibold text-lg mb-2">Ratings <TfiAngleUp className="inline-block float-right" /></h2>
          {[5, 4, 3, 2].map((stars) => (
            <div
              key={stars}
              className="flex items-center space-x-2 cursor-pointer mb-2"
              onClick={() => setSelectedRating(stars)}
            >
              <input type="checkbox" checked={selectedRating === stars} readOnly />
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < stars ? "text-orange-500 fill-orange-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-full sm:w-3/4 items-center">
          {/* Top Bar */}
          <div className={`p-3 sm:p-4 md:p-6 h-12 sm:h-16 md:h-20 m-1 flex justify-between items-center bg-white rounded-2xl mb-2`}
          >

            <span className="text-medium hidden sm:block">
              12,911 items in <strong className="font-semibold">Mobile accessory</strong>
            </span>
            <div className="flex items-center gap-2 ">
              <label className="hidden sm:inline-flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-1 hidden sm:block"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly(!verifiedOnly)}
                />
                Verified only
              </label>
              <select className="border rounded text-sm p-1 text-left sm:text-center">
                <option>Sort: Featured</option>
                <option>Newest</option>
                <option>Lowest Price</option>
              </select>

              <div className="block md:hidden sm:gap-10  ">
                  <select className="border rounded text-sm p-1 text-left sm:text-center">
                   <option>Filter (2) </option>
                   <option>Categories</option>
                   <option>Brands</option>
                   <option>Features</option>
                   
                    </select>
                        </div>
              <div className="flex border rounded overflow-hidden sm:ml-auto ">
                <button
                  className={`p-1 ${view === "grid" ? "bg-blue-100" : ""}`}
                  onClick={() => {
                    setView("grid");
                    setGridLayout(true);
                  }}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  className={`p-1 ${view === "list" ? "bg-blue-100" : ""}`}
                  onClick={() => {
                    setView("list");
                    setGridLayout(false);
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className={ gridLayout ? "p-2 grid grid-cols-2 gap-3 sm:grid sm:grid-cols-3 sm:gap-3" : "p-2 space-y-2 sm:space-y-4"}>
  {dummyProducts.map((product) => (
    <Card
      key={product.id}
      className={`w-full relative rounded-lg shadow-sm bg-white p-2
        ${gridLayout
          ? "flex flex-col items-center justify-center"
          : "flex flex-row gap-3 sm:gap-4 items-start p-3 sm:p-6"}
      `}
    >
     
      <div
        className={`${
          gridLayout
            ? "flex justify-center items-center w-full"
            : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded`}
        />
      </div>


      {/* CONTENT - Right side */}
      <CardContent className="flex flex-col justify-between space-y-1 sm:w-full ">
        <h3 className="text-xm font-semibold sm:text-base">{product.title}</h3>

        {/* Price Row */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="font-bold text-black">{product.price}</span>
          <span className="line-through text-gray-400 text-xs sm:text-sm">
            {product.originalPrice}
          </span>
        </div>

        {/* Rating + Orders + Shipping */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="text-yellow-500">
            ★★★★<span className="text-gray-300">★</span> {product.rating}
          </span>
          <span className="text-gray-500">{product.orders} orders</span>
          <span className="text-green-600">{product.freeShipping && "Free Shipping"}</span>
        </div>

        {/* Hidden on mobile */}
        <p className={`text-xs text-gray-600 hidden sm:block ${gridLayout ? "block lg:hidden" : "text-xs text-gray-600 hidden sm:block" } `}>{product.description}</p>

        <a href="#" className="text-blue-600 font-semibold text-sm">View details</a>
      </CardContent>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2  bottom-0 right-1 text-blue-500"
        title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={wishlist.includes(product.id) ? "fill-current" : "stroke-current"} />
      </button>
    </Card>
  ))}
</div>
<div className="block md:block">
<div className="p-4 block sm:hidden">
  <span className="text-xl font-bold"> You may also like
  </span>
</div>
<div className="block lg:hidden p-4  sm:hidden">

<Swiper spaceBetween={10} slidesPerView={1.5} className="block lg:hidden p-2 px-4 py-6">
      {[1, 2].map((_, index) => (
        <SwiperSlide key={index}>
          <ProductCard
            image="./images/1.png"
            price="10.30"
            title="Solid Backpack"
            description="blue jeans large size"
          />
        </SwiperSlide>
      ))}
    </Swiper> 
    </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ProductListing;




