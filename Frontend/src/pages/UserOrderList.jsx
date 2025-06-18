import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext"; // adjust if needed

const UserOrderList = () => {
  const { userInfo } = useAuth(); // make sure user._id is available
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/orders/${userInfo._id}`
        );
        setOrders(res.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setLoading(false);
      }
    };

    if (userInfo?._id) {
      fetchUserOrders();
    }
  }, [userInfo]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order ID: {order._id}
                </h3>
                <p className="text-sm text-gray-500">
                  Shipping to: {order.address}
                </p>
                <p className="text-sm text-gray-500">
                  Payment: {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
                <p className="text-sm text-gray-500 font-semibold">
                  Total: ${order.totalAmount}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border rounded-md shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-gray-800 font-medium">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderList;
