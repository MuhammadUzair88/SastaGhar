import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import OrderProductCard from "../components/OrderProductCard";
import RelatedProducts from "../components/RelatedProducts";

const OrderPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fetch new product data
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/product/single`,
          { productId: id }
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
  }, [id]); // Will trigger on every route param change

  if (!product)
    return (
      <div className="p-10 text-center text-gray-500">Loading product...</div>
    );

  return (
    <div className="bg-gray-50 sm:bg-gray-200 sm:px-20 sm:py-10">
      <div className="text-[16px] text-gray-500 mb-0 sm:px-[5px] py-3 p-10 hidden lg:block">
        Home &gt; {product.category} &gt; {product.name}
      </div>

      <div className="sm:px-[60px] sm:py-0 bg-white border border-white rounded">
        <OrderProductCard product={product} />
      </div>

      <div className="py-2">
        <RelatedProducts productId={id} category={product.category} />
      </div>
    </div>
  );
};

export default OrderPage;
