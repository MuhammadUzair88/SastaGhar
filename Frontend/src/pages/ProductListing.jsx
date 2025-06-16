import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { Star, Heart, LayoutGrid, List } from "lucide-react";
import { TfiArrowLeft } from "react-icons/tfi";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [wishlist, setWishlist] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/product/list");
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category && category !== "All category") {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [query, category, products]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-0 sm:p-8 bg-gray-100 min-h-screen">
      <div className="text-sm text-gray-400 mb-4 hidden sm:block">
        Home {">"} {category || "Products"} {">"} Results
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-1/4 p-8 bg-white shadow-sm rounded">
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold mb-2">Filters</h2>
            <p className="text-sm text-gray-500">
              Filter options coming soon...
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Top Bar */}
          <div className="p-3 sm:p-6 flex justify-between items-center bg-white rounded-lg mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <TfiArrowLeft className="hidden sm:block" />
              <span className="capitalize text-sm sm:text-base">
                {filteredProducts.length} items in{" "}
                <strong className="font-semibold">
                  {category || query || "Products"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center text-sm">
                <input type="checkbox" className="mr-1" id="verified-only" />
                <label htmlFor="verified-only">Verified only</label>
              </div>
              <select className="border rounded text-xs sm:text-sm p-1 sm:p-2">
                <option>Sort: Featured</option>
                <option>Newest</option>
                <option>Lowest Price</option>
              </select>
              <div className="flex border rounded overflow-hidden">
                <button
                  className={`p-1 sm:p-2 ${
                    viewMode === "grid" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  className={`p-1 sm:p-2 ${
                    viewMode === "list" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          {/* Product List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className={`flex ${
                  viewMode === "list" ? "flex-row" : "flex-col items-start"
                } bg-white rounded-lg shadow-sm p-2 sm:p-3 relative`}
              >
                <img
                  src={product.image?.[0] || "/fallback.png"}
                  alt={product.name}
                  className={`rounded object-cover ${
                    viewMode === "list"
                      ? "w-24 h-24 sm:w-32 sm:h-32"
                      : "w-full h-48 sm:h-52 md:h-56 lg:h-60"
                  }`}
                />
                <CardContent
                  className={`flex-1 ${
                    viewMode === "list" ? "pl-4 py-0" : "pt-2 px-1"
                  }`}
                >
                  <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 my-1">
                    <span className="font-semibold text-green-600">
                      ${product.price}
                    </span>
                    {viewMode === "grid" && (
                      <span className="text-xs text-gray-500">
                        {product.stock} in stock
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={
                            star <= 4
                              ? "fill-current text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-1 text-gray-700">4.0</span>
                    </div>
                    <span className="text-gray-500">100 orders</span>
                    {viewMode === "list" && (
                      <span className="text-green-600">Free Shipping</span>
                    )}
                  </div>
                  {viewMode === "list" && (
                    <p className="text-xs text-gray-600 mt-2 hidden sm:block">
                      {product.description.substring(0, 100)}...
                    </p>
                  )}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold text-xs sm:text-sm mt-1 inline-block"
                  >
                    View details
                  </a>
                </CardContent>

                {/* Heart Icon */}
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className={`absolute text-blue-500 z-10 ${
                    viewMode === "grid" ? "bottom-25 right-3" : "top-3 right-3"
                  }`}
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.includes(product._id)
                        ? "fill-current text-red-500"
                        : "stroke-current"
                    }
                  />
                </button>
              </Card>
            ))}
>>>>>>> 478d418 (Ongoing Backend)
          </div>

          {/* Mobile Swiper */}
          <div className="block lg:hidden mt-8">
            <div className="p-4">
              <span className="text-lg font-bold">You may also like</span>
            </div>
            <Swiper spaceBetween={10} slidesPerView={1.3} className="p-2">
              {filteredProducts.slice(0, 3).map((product) => (
                <SwiperSlide key={product._id}>
                  <Card className="bg-white rounded-lg shadow-sm p-3">
                    <img
                      src={product.image?.[0] || "/fallback.png"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <CardContent className="pt-3 px-0">
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <div className="flex items-center gap-2 my-1">
                        <span className="font-semibold text-green-600">
                          ${product.price}
                        </span>
                      </div>
                      <a
                        href="#"
                        className="text-blue-600 font-semibold text-xs mt-1 inline-block"
                      >
                        View details
                      </a>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
