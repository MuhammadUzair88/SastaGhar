import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product/get"
    );
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      alert("error in Fetching Products");
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <div className="bg-gray-900 min-h-screen ">
      <div className="flex gap-8 p-4 items-center justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <Cards
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
            />
          ))
        ) : (
          <h1 className="text-white font-bold">No Products Found</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
