import axios from "axios";
import React, { useState } from "react";
import { MdBrowserUpdated, MdDeleteOutline } from "react-icons/md";

const Cards = ({ name, price, image, id }) => {
  const [Productname, setProductname] = useState("");
  const [ProductPrice, setPrice] = useState("");
  const [ProductImage, setImage] = useState("");
  const [modal, setModal] = useState(false);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/product/update/${id}`,
        {
          name: Productname,
          price: ProductPrice,
          image: ProductImage,
        }
      );
      if (res.data.success) {
        alert("Product Updated Successfully");
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error updating product");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/product/delete/${id}`
      );
      if (res.data.success) {
        alert("Product Deleted Successfully");
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error Deleting product");
    }
  };

  return (
    <div className="">
      <div className="flex flex-col rounded-lg shadow-lg  ">
        <div>
          <img src={image} alt="Shirt" className="w-64 h-64 rounded-t-lg " />
        </div>
        <div className="bg-[#181D2A] rounded-b-lg">
          <div className="flex flex-col  text-white p-4 font-medium gap-1 ">
            <h1 className="">{name}</h1>
            <p>${price}</p>
          </div>
          <div className="px-4 mb-4 flex items-center gap-3">
            <button
              onClick={() => setModal(true)}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              <MdBrowserUpdated />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="flex flex-col gap-4 items-center shadow-lg bg-white rounded-lg p-8  max-w-md">
            <h1 className=" tracking-tighter text-xl text-indigo-800">
              Update Product
            </h1>

            <form action="submit">
              <div>
                <label htmlFor="">Product Name</label>
                <input
                  value={Productname}
                  onChange={(e) => setProductname(e.target.value)}
                  type="text"
                  className="border-2 border-indigo-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <input
                  value={ProductPrice}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  className="border-2 border-indigo-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="">ImageUrl</label>
                <input
                  value={ProductImage}
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                  className="border-2 border-indigo-300 rounded-lg p-2 w-full"
                />
              </div>
            </form>
            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-lg "
              >
                {" "}
                Update{" "}
              </button>
              <button
                onClick={() => setModal(false)}
                className="bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg "
              >
                {" "}
                Close{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
