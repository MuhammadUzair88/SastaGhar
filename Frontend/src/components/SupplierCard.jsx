import React from 'react';
import { MdOutlineVerifiedUser, MdLocalShipping } from "react-icons/md";
import { Heart } from "lucide-react";


const SupplierCard = () => {
  return (
    <div className="p-4 bg-gray-50 sm:bg-white">
      {/* Supplier Info */}
      <div className='px-2 py-2 bg-white rounded-xl sm:shadow sm:w-[350px]'>
      <div className="flex items-center gap-3 b">
        <div className="bg-emerald-200 text-emerald-600 px-3 py-2 rounded font-bold text-sm">R</div>
        <div>
          <p className="text-sm text-gray-600">Supplier</p>
          <p className="text-sm text-gray-700 font-semibold">Guanjoi Trading LLC</p>
        </div>
      </div>

      <hr className="my-3 text-gray-200" />

      {/* Badges */}
     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full">
  {/* Left Section: Country, Verified, Shipping */}
  <div className="flex flex-row sm:flex-col flex-wrap gap-2 text-sm text-gray-600">
    <span className="flex items-center gap-1">
      🌍 <span>Germany</span>
    </span>
    <span className="flex items-center gap-1">
      <MdOutlineVerifiedUser className="text-blue-600" />
      <span>Verified</span>
    </span>
    <span className="flex items-center gap-1">
      <MdLocalShipping className="text-green-600" />
      <span>Shipping</span>
    </span>

    {/* Desktop-only buttons now placed directly under Shipping */}
    <div className=" px-8 hidden sm:flex justify-center mt-6">
  <div className="flex flex-col items-center gap-3">
    <button className="w-[280px] bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-base font-semibold shadow-sm hover:from-blue-600 hover:to-blue-700 transition">
      Send inquiry
    </button>
    <button className="w-[280px] border border-blue-200 text-blue-600 py-3 rounded-lg text-base font-semibold bg-white hover:bg-blue-50 transition">
      Seller’s profile
    </button>
  </div>
</div>


  </div>
</div>

</div>
      {/* Similar Products for Mobile */}
      <div className="mt-6 block lg:hidden bg-gray-50 rounded-xl p-2 ">
        <h3 className="font-semibold text-sm mb-2">Similar products</h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-gray-300 rounded p-2 text-center bg-white">
              <img src="./images/23.png" alt="Similar" className="w-full h-20 object-cover rounded" />
              <p className="mt-1 text-xs font-medium">$10.30</p>
              <p className="text-[10px] text-gray-500">T-shirts with multiple colors</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
