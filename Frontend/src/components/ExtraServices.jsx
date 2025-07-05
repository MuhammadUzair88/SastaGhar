import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExtraServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExtraServices = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/product/list`
        );
        const filtered = res.data.products.filter((p) => p.otherServices);
        setServices(filtered);
      } catch (err) {
        console.error("Failed to load extra services:", err);
      }
    };
    fetchExtraServices();
  }, []);

  const renderImageGrid = (images) => {
    const imageCount = images?.length || 0;

    if (!images || imageCount === 0) {
      return (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      );
    }

    if (imageCount === 1) {
      return (
        <img
          src={images[0] || "/fallback.png"}
          alt="Product"
          className="w-full h-48 object-cover rounded-lg"
        />
      );
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 h-48">
          <img
            src={images[0] || "/fallback.png"}
            alt="1"
            className="w-full h-full object-cover rounded-l-lg"
          />
          <img
            src={images[1] || "/fallback.png"}
            alt="2"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      );
    }

    if (imageCount === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div className="col-span-1 row-span-2 h-48">
            <img
              src={images[0] || "/fallback.png"}
              alt="1"
              className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
            />
          </div>
          <div className="h-24">
            <img
              src={images[1] || "/fallback.png"}
              alt="2"
              className="w-full h-full object-cover rounded-tr-lg"
            />
          </div>
          <div className="h-24">
            <img
              src={images[2] || "/fallback.png"}
              alt="3"
              className="w-full h-full object-cover rounded-br-lg"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-48">
        <img
          src={images[0] || "/fallback.png"}
          alt="1"
          className="w-full h-full object-cover rounded-tl-lg"
        />
        <img
          src={images[1] || "/fallback.png"}
          alt="2"
          className="w-full h-full object-cover rounded-tr-lg"
        />
        <img
          src={images[2] || "/fallback.png"}
          alt="3"
          className="w-full h-full object-cover rounded-bl-lg"
        />
        <img
          src={images[3] || "/fallback.png"}
          alt="4"
          className="w-full h-full object-cover rounded-br-lg"
        />
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {services.map((service) => {
          const discountedPrice = service.onSale
            ? service.price -
              (service.price * (service.salePercentage || 0)) / 100
            : null;
          const images = service.image?.slice(0, 4) || [];

          return (
            <div
              key={service._id}
              className="w-full max-w-[220px] flex flex-col justify-between cursor-pointer group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              {/* Images */}
              <div className="relative w-full h-48">
                {renderImageGrid(images)}

                {service.onSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    -{service.salePercentage}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between px-3 py-3 text-center h-full">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {service.category}
                  </p>

                  <div className="mt-2 text-sm flex justify-center items-center gap-2">
                    {service.onSale ? (
                      <>
                        <span className="line-through text-gray-400 text-xs">
                          ₨{service.price.toLocaleString("en-PK")}
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₨{discountedPrice.toLocaleString("en-PK")}
                        </span>
                      </>
                    ) : (
                      <span className="text-green-700 font-semibold">
                        ₨{service.price.toLocaleString("en-PK")}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="mt-3 w-full text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 rounded-md transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${service._id}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No services found
          </h3>
          <p className="mt-1 text-gray-500">
            We couldn't find any extra services at this time.
          </p>
        </div>
      )}
    </>
  );
};

export default ExtraServices;
