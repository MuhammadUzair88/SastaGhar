import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]); // 4 images max
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [stock, setStock] = useState("");

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
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      {/* Image Uploads */}
      <div>
        <p className="mb-2">Upload Product Images</p>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <label htmlFor={`image${i}`} key={i}>
              <img
                className="w-20 h-20 object-cover border border-gray-300 rounded"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                onChange={(e) => handleImageChange(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category and Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-2">Category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {/* Fashion */}
            <option value="Men Clothing">Men Clothing</option>
            <option value="Women Clothing">Women Clothing</option>
            <option value="Kids Clothing">Kids Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Watches">Watches</option>

            {/* Electronics */}
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Tablets">Tablets</option>
            <option value="Cameras">Cameras</option>
            <option value="Smartwatches">Smartwatches</option>
            <option value="Headphones">Headphones</option>

            {/* Home & Kitchen */}
            <option value="Furniture">Furniture</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Lighting">Lighting</option>
            <option value="Cookware">Cookware</option>
            <option value="Appliances">Appliances</option>
            <option value="Bedding">Bedding</option>

            {/* Beauty & Personal Care */}
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Makeup">Makeup</option>
            <option value="Fragrances">Fragrances</option>
            <option value="Bath & Body">Bath & Body</option>

            {/* Sports & Outdoors */}
            <option value="Sportswear">Sportswear</option>
            <option value="Fitness Equipment">Fitness Equipment</option>
            <option value="Outdoor Gear">Outdoor Gear</option>

            {/* Baby & Kids */}
            <option value="Toys">Toys</option>
            <option value="Baby Care">Baby Care</option>
            <option value="School Supplies">School Supplies</option>

            {/* Grocery & Food */}
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Packaged Foods">Packaged Foods</option>

            {/* Pet Supplies */}
            <option value="Pet Food">Pet Food</option>
            <option value="Pet Accessories">Pet Accessories</option>

            {/* Others */}
            <option value="Books">Books</option>
            <option value="Stationery">Stationery</option>
            <option value="Gifts">Gifts</option>
            <option value="Automobiles">Automobiles</option>
            <option value="Clothes and wear">Clothes and wear</option>
            <option value="Home interiors">Home interiors</option>
            <option value="Computer and tech">Computer and tech</option>
            <option value="Tools, equipments">Tools, equipments</option>
            <option value="Sports and outdoor">Sports and outdoor</option>
            <option value="Animal and pets">Animal and pets</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Price</p>
          <input
            className="w-full px-3 py-2"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="mb-2">Stock</p>
          <input
            className="w-full px-3 py-2"
            type="number"
            placeholder="100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
