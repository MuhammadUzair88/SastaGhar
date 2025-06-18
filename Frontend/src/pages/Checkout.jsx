import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, products, clearCart } = useCart();
  const { userInfo } = useAuth();
  const [form, setForm] = useState({
    name: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });
  const navigate = useNavigate();

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p._id === id);
    return {
      productId: product._id,
      title: product.name,
      quantity: qty,
      price: product.price,
      image: product.image[0],
    };
  });

  const totalAmount =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    10 +
    14 -
    60;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = userInfo._id; // replace with real user ID
      await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/orders/place`, {
        userId,
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
        <h2 className="text-xl font-semibold">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
