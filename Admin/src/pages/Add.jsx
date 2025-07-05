import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [stock, setStock] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [salePercentage, setSalePercentage] = useState("");
  const [otherServices, setOtherServices] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("onSale", onSale);
      formData.append("salePercentage", onSale ? salePercentage : 0);
      formData.append("otherServices", otherServices);

      images.forEach((img, i) => {
        if (img) {
          formData.append(`image${i + 1}`, img);
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/product/add`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setStock("");
        setImages([null, null, null, null]);
        setOnSale(false);
        setSalePercentage("");
        setOtherServices(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-4"
      onSubmit={onSubmitHandler}
    >
      {/* Image Uploads */}
      <div>
        <p className="mb-2 font-medium">Upload Product Images</p>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <label htmlFor={`image${i}`} key={i}>
              <img
                className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category, Price, Stock */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[700px]">
        <div className="flex-1">
          <p className="mb-2 font-medium">Category</p>
          <select
            className="w-full px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Women & Men Clothes">Women & Men Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Cosmetics & Beauty">Cosmetics & Beauty</option>
            <option value="Mobile & Accessories">Mobile & Accessories</option>
            <option value="Kitchenware">Kitchenware</option>
            <option value="Babies & Toys">Babies & Toys</option>
            <option value="Personal Care Products">
              Personal Care Products
            </option>
            <option value="Gifts">Gifts</option>
            <option value="Watches">Watches</option>
            <option value="Perfumes">Perfumes</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2 font-medium">Price</p>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="e.g. 499"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <p className="mb-2 font-medium">Stock</p>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="e.g. 100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
      </div>

      {/* ✅ On Sale Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={onSale}
          onChange={(e) => setOnSale(e.target.checked)}
        />
        <label className="font-medium">Add this product on Sale?</label>
      </div>

      {/* ✅ Sale Percentage */}
      {onSale && (
        <div className="w-full max-w-[300px]">
          <p className="mb-2 font-medium">Sale Percentage (%)</p>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="20"
            value={salePercentage}
            onChange={(e) => setSalePercentage(e.target.value)}
            required
          />
        </div>
      )}

      {/* ✅ Other Services Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={otherServices}
          onChange={(e) => setOtherServices(e.target.checked)}
        />
        <label className="font-medium">
          Add this product to Other Services?
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-32 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
