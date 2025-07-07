import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, productId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKENDURL
          }/api/product/list?category=${encodeURIComponent(category)}`
        );

        if (res.data.success) {
          const filtered = res.data.products
            .filter((p) => p._id !== productId)
            .slice(0, 6); // Only 6 related products
          setRelated(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch related products:", err.message);
      }
    };

    if (category && productId) {
      fetchRelatedProducts();
    }
  }, [category, productId]);

  if (!related.length) return null;

  return (
    <div className="px-4 sm:px-8 lg:px-20 mt-10">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Related Products
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {related.map((product) => {
          const isOnSale = product.onSale;
          const salePrice = isOnSale
            ? (
                product.price -
                (product.price * product.salePercentage) / 100
              ).toFixed(2)
            : null;

          const images = product.otherServices
            ? product.image.slice(0, 4)
            : [product.image[0]];

          let imageGridClass = "";
          if (images.length === 2 || images.length === 3)
            imageGridClass = "grid-cols-2";
          if (images.length === 4) imageGridClass = "grid-cols-2 grid-rows-2";

          return (
            <div
              key={product._id}
              className="relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-3 group flex flex-col justify-between"
            >
              {product.otherServices && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                  Extra Services
                </span>
              )}

              <div className="w-full min-h-[130px] sm:min-h-[150px] flex items-center justify-center mb-3">
                {product.otherServices ? (
                  <div className={`grid ${imageGridClass} gap-1 w-full h-full`}>
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`related-${i}`}
                        className="w-full h-full object-cover rounded-md border"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={images[0]}
                    alt={product.name}
                    className="h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[38px]">
                  {product.name}
                </p>
                <div className="mt-1">
                  {isOnSale ? (
                    <>
                      <span className="text-blue-600 font-bold text-sm">
                        ₨{salePrice}
                      </span>
                      <span className="line-through text-gray-400 text-xs ml-2">
                        ₨{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <p className="text-blue-600 font-semibold text-sm">
                      ₨{product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                <Link
                  to={`/product/${product._id}`}
                  className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
