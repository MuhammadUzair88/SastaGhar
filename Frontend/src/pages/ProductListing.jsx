import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { Star, Heart, LayoutGrid, List } from "lucide-react";
import { TfiArrowLeft } from "react-icons/tfi";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWishlist } from "../context/WishlistContext";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [searchParams] = useSearchParams();

  const { wishlist, toggleWishlist } = useWishlist();

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/product/list`
        );
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

        {/* Main Section */}
        <div className="w-full lg:w-3/4">
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

          {/* Products Grid/List */}
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
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 font-semibold text-xs sm:text-sm mt-1 inline-block"
                  >
                    View details
                  </Link>
                </CardContent>

                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute text-blue-500 z-10 ${
                    viewMode === "grid" ? "bottom-25 right-3" : "top-3 right-3"
                  }`}
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.find((item) => item._id === product._id)
                        ? "fill-current text-red-500"
                        : "stroke-current"
                    }
                  />
                </button>
              </Card>
            ))}
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
                      <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 font-semibold text-xs mt-1 inline-block"
                      >
                        View details
                      </Link>
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
