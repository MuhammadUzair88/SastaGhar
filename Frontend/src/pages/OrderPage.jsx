import React from 'react';
import OrderProductCard from '../components/OrderProductCard';
import SupplierCard from '../components/SupplierCard';
import { Heart } from "lucide-react";
import DescriptionCard from '../components/DescriptionCard';
import RelatedProductsDesktop from '../components/RelatedProductsDesktop';

const OrderPage = () => {
  return (
    
    <div className="bg-gray-50 sm:bg-gray-200 sm:px-20 sm:py-10">
      {/* Breadcrumb (hidden on mobile) */}
      <div className="text-[16px] text-gray-500 mb-0 sm:px-[5px] py-3 p-10 hidden lg:block">
  Home &gt; Clothing &gt; Men's wear &gt; Summer clothing
</div>

      {/* Main Container */}
      <div className="sm:px-[60px] sm:py-0 bg-white border border-white rounded">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Product */}
          <div className="w-full lg:w-2/3 ">
            <OrderProductCard />
           
          </div>

          {/* Right Side - Supplier + Save */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div className="">
              <SupplierCard />
            </div>

            <div className="mt-4 py-5 hidden sm:flex justify-center">
  <button className="flex items-center gap-2 bg-white  rounded px-4 w-[240px] justify-center  transition">
    <Heart className="text-blue-600" size={20} />
    <span className="text-blue-700 text-sm font-medium">Save for later</span>
  </button>
</div>


          </div>
        </div>
      </div>
      <div className='py-5'>
 <DescriptionCard />
 </div>
 <div className='py-2'> 
<RelatedProductsDesktop/>
 </div>

    </div>
  );
};

export default OrderPage;
