import React from 'react';

const DescriptionCard = () => {
  return (
    <div className="hidden lg:block bg-gray py-2 px-2">
      {/* FLEX CONTAINER: Description + Related Products */}
      <div className="flex gap-4">
        
        {/* LEFT SIDE: Main Description Box */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-200 w-3/4">
          <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-4 text-sm sm:text-base">
            <button className="pb-2 text-blue-600 border-b-2 border-blue-600 font-medium">Description</button>
            <button className="pb-2 text-gray-500 hover:text-blue-600">Reviews</button>
            <button className="pb-2 text-gray-500 hover:text-blue-600">Shipping</button>
            <button className="pb-2 text-gray-500 hover:text-blue-600">About seller</button>
          </div>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          {/* Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium bg-gray-50 whitespace-nowrap">Model</td>
                  <td className="p-2">#8786867</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium bg-gray-50 whitespace-nowrap">Style</td>
                  <td className="p-2">Classic style</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium bg-gray-50 whitespace-nowrap">Certificate</td>
                  <td className="p-2">ISO-898921212</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium bg-gray-50 whitespace-nowrap">Size</td>
                  <td className="p-2">34mm x 450mm x 19mm</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium bg-gray-50 whitespace-nowrap">Memory</td>
                  <td className="p-2">36GB RAM</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Feature List */}
          <ul className="list-none space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Some great feature name here</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Lorem ipsum dolor sit amet, consectetur</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Duis aute irure dolor in reprehenderit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Some great feature name here</span>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE: Related Products */}
        <div className="w-full lg:w-1/4 bg-white shadow rounded-xl py-10 px-10  h-fit">
  <h3 className="font-semibold text-xl mb-3">Related products</h3>
  <div className="grid grid-cols-1 gap-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="border border-gray-300 rounded p-1 text-center bg-white">
        <img
          src="./images/23.png"
          alt="Similar"
          className="w-full h-20 object-cover rounded"
        />
        <p className="mt-2 text-sm font-medium">$10.30</p>
        <p className="text-xs text-gray-500">T-shirts with multiple colors</p>
      </div>
    ))}
  </div>
</div>

        
      </div>
    </div>
  );
};

export default DescriptionCard;
