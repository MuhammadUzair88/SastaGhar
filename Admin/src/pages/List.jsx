import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/product/list`
      );
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/product/remove`,
        { id }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        All Products List
      </h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md hidden sm:table">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">
                  {product.otherServices ? (
                    <div className="grid grid-cols-2 gap-1 w-16 h-16">
                      {product.image.slice(0, 4).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`service-${i}`}
                          className="w-full h-full object-cover rounded border"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ₨{product.price?.toLocaleString("en-PK")}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-600 hover:text-red-800 font-medium"
                    onClick={() => removeProduct(product._id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden">
        {list.map((product) => (
          <div
            key={product._id}
            className="flex flex-col bg-white border rounded-lg shadow-md mb-4 p-4"
          >
            <div className="flex items-start mb-3">
              {product.otherServices ? (
                <div className="grid grid-cols-2 gap-1 w-24 h-24 mr-4">
                  {product.image.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`service-${i}`}
                      className="w-full h-full object-cover rounded border"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
              )}
              <h3 className="text-lg font-medium text-gray-700 mt-1">
                {product.name}
              </h3>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Price:</span>
              <span>₨{product.price?.toLocaleString("en-PK")}</span>
            </div>
            <button
              className="self-end text-red-600 hover:text-red-800 font-medium"
              onClick={() => removeProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
