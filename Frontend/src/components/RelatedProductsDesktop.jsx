import React from 'react';

const RelatedProductsDesktop = () => {
  const products = [
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
    { image: '/images/photo.png', name: 'Xiaomi Redmi 8 Original', price: '$32.00–$40.00' },
  ];

  return (
    <div className="hidden lg:block">
      {/* Related Products Card */}
      <div className=" p-6 rounded-md bg-white shadow-md">
        <h3 className="text-lg font-semibold mb-4">Related products</h3>
        <div className="grid grid-cols-6 gap-4 ">
          {products.map((product, index) => (
            <div key={index} className="text-center">
              <img src={product.image} alt={product.name} className="mx-auto h-24 object-contain" />
              <p className="text-sm mt-2">{product.name}</p>
              <p className="text-gray-500 text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-md flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Super discount on more than 100 USD</p>
          <p className="text-sm text-white/70">Have you ever finally just write dummy info</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default RelatedProductsDesktop;
