import axios from "axios";
import React, { useState } from "react";

const Create = () => {
  const [name, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/product/create",
        {
          name,
          price,
          image,
        }
      );
      if (res.data.success) {
        alert("Product Created Successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Error creating product");
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 h-screen">
      <div className="flex flex-col gap-4 items-center shadow-lg bg-white rounded-lg p-8  max-w-md">
        <h1 className=" tracking-tighter text-xl text-indigo-800">
          Create Product
        </h1>

        <form action="submit">
          <div>
            <label htmlFor="">Product Name</label>
            <input
              value={name}
              onChange={(e) => setProductname(e.target.value)}
              type="text"
              className="border-2 border-indigo-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="border-2 border-indigo-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="">ImageUrl</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="border-2 border-indigo-300 rounded-lg p-2 w-full"
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-lg "
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  );
};

export default Create;
