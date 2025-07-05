import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { LayoutGrid, List } from "lucide-react";
import { TfiArrowLeft } from "react-icons/tfi";
import axios from "axios";
import ExtraServiceCard from "../components/ExtraServiceCard";

const priceRanges = [
  { label: "₨500 - ₨1000", min: 500, max: 1000 },
  { label: "₨1000 - ₨2000", min: 1000, max: 2000 },
  { label: "₨2000 - ₨5000", min: 2000, max: 5000 },
  { label: "₨5000+", min: 5000, max: Infinity },
];

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams] = useSearchParams();

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
    if (selectedPriceRange) {
      filtered = filtered.filter(
        (item) =>
          item.price >= selectedPriceRange.min &&
          item.price <= selectedPriceRange.max
      );
    }

    setFilteredProducts(filtered);
  }, [query, category, products, selectedPriceRange]);

  return (
    <div className="p-2 sm:p-8 bg-gray-100 min-h-screen">
      <div className="text-sm text-gray-400 mb-4 hidden sm:block">
        Home {">"} {category || "Products"} {">"} Results
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          className="bg-white text-sm border border-gray-300 px-4 py-2 rounded shadow-sm"
          onClick={() => setShowMobileFilters((prev) => !prev)}
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showMobileFilters && (
          <div className="mt-4 bg-white p-4 rounded border">
            <h2 className="font-semibold mb-4">Price Filters</h2>
            <div className="grid grid-cols-2 gap-3">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="price"
                    className="mr-2"
                    checked={selectedPriceRange?.label === range.label}
                    onChange={() =>
                      setSelectedPriceRange(
                        selectedPriceRange?.label === range.label ? null : range
                      )
                    }
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block w-1/4 p-8 bg-white shadow-sm rounded">
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold mb-4">Price Filters</h2>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="price"
                    className="mr-2"
                    checked={selectedPriceRange?.label === range.label}
                    onChange={() =>
                      setSelectedPriceRange(
                        selectedPriceRange?.label === range.label ? null : range
                      )
                    }
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="p-3 sm:p-6 flex justify-between items-center bg-white rounded-lg mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <TfiArrowLeft className="hidden sm:block" />
              <span>
                {filteredProducts.length} items in{" "}
                <strong className="font-semibold capitalize">
                  {category || query || "Products"}
                </strong>
              </span>
            </div>

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

          {/* Product Cards */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {filteredProducts.map((product) => {
              if (product.otherServices) {
                return (
                  <ExtraServiceCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                );
              }

              const discountedPrice = product.onSale
                ? product.price -
                  (product.price * (product.salePercentage || 0)) / 100
                : null;

              return (
                <Card
                  key={product._id}
                  className={`flex ${
                    viewMode === "list" ? "flex-row" : "flex-col items-start"
                  } bg-white rounded-lg shadow-sm p-2 sm:p-3`}
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
                      {product.onSale ? (
                        <>
                          <span className="line-through text-gray-400 text-sm">
                            ₨{product.price.toLocaleString("en-PK")}
                          </span>
                          <span className="font-semibold text-green-600">
                            ₨{discountedPrice.toLocaleString("en-PK")}
                          </span>
                          <span className="text-xs text-red-500 bg-red-100 px-1 rounded">
                            -{product.salePercentage}%
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-green-600">
                          ₨{product.price.toLocaleString("en-PK")}
                        </span>
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
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
