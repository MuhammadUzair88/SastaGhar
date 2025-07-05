import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, products, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p._id === id);
    return {
      productId: product._id,
      title: product.name,
      quantity: qty,
      price: product.price,
      image: product.image, // can be string or array
      onSale: product.onSale || false,
      salePercentage: product.salePercentage || 0,
      otherServices: product.otherServices || false,
    };
  });

  const totalAmount =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    10 + // shipping
    14 - // service fee
    60; // discount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/orders/place`, {
        userId: userInfo._id,
        ...form,
        items: cartItems,
        totalAmount,
      });
      clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error("Order failed", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phoneNo}
            onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <select
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
            className="w-full px-4 py-2 border rounded"
          >
            <option>Cash on Delivery</option>
          </select>

          <div className="text-gray-700 font-medium">
            Total: ₨{totalAmount.toLocaleString("en-PK")}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
