import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import OrderProductCard from "../components/OrderProductCard";
import SupplierCard from "../components/SupplierCard";
import { Heart } from "lucide-react";
import DescriptionCard from "../components/DescriptionCard";
import RelatedProductsDesktop from "../components/RelatedProductsDesktop";

const OrderPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/product/single`,
          {
            productId: id,
          }
        );

        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="p-10 text-center text-gray-500">Loading product...</div>
    );

  return (
    <div className="bg-gray-50 sm:bg-gray-200 sm:px-20 sm:py-10">
      {/* Breadcrumb (hidden on mobile) */}
      <div className="text-[16px] text-gray-500 mb-0 sm:px-[5px] py-3 p-10 hidden lg:block">
        Home &gt; {product.category} &gt; {product.name}
      </div>

      {/* Main Container */}
      <div className="sm:px-[60px] sm:py-0 bg-white border border-white rounded">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product */}
          <div className="w-full lg:w-2/3">
            <OrderProductCard product={product} />
          </div>

          {/* Right Side - Supplier + Save */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <SupplierCard product={product} />
            </div>

            <div className="mt-4 py-5 hidden sm:flex justify-center">
              <button className="flex items-center gap-2 bg-white rounded px-4 w-[240px] justify-center transition">
                <Heart className="text-blue-600" size={20} />
                <span className="text-blue-700 text-sm font-medium">
                  Save for later
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <DescriptionCard product={product} />
      </div>

      <div className="py-2">
        <RelatedProductsDesktop />
      </div>
    </div>
  );
};

export default OrderPage;
