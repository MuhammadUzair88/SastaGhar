import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const UserOrderList = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reason, setReason] = useState("");

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/orders/${userInfo._id}`
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?._id) fetchUserOrders();
  }, [userInfo]);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const submitReview = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/reviews`,
        {
          orderId: reviewOrder._id,
          phoneNo: reviewOrder.phoneNo,
          email: reviewOrder.email,
          address: reviewOrder.address,
          reason,
        }
      );
      toast.success("Review submitted successfully!");
      setShowReviewForm(false);
      setReviewOrder(null);
      setReason("");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Order #{order._id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <button
                onClick={() => toggleOrder(order._id)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                {expandedOrder === order._id ? "Hide Order" : "View Your Order"}
              </button>

              {expandedOrder === order._id && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {order.phoneNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Total:</strong> ₨{order.totalAmount}
                  </p>

                  <div className="border-t pt-3 mt-3">
                    <p className="font-semibold text-gray-700 mb-2">
                      Products in this order:
                    </p>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start mb-3">
                        {item.otherServices && Array.isArray(item.image) ? (
                          <div className="grid grid-cols-2 gap-1 w-20 h-20">
                            {item.image.slice(0, 4).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="product"
                                className="w-full h-full object-cover rounded border"
                              />
                            ))}
                          </div>
                        ) : (
                          <img
                            src={
                              Array.isArray(item.image)
                                ? item.image[0]
                                : item.image
                            }
                            alt="product"
                            className="w-20 h-20 object-cover rounded border"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-xs text-gray-600">
                            Price: ₨{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.status === "Delivered" && (
                    <button
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => {
                        setReviewOrder(order);
                        setShowReviewForm(true);
                      }}
                    >
                      Request Refund / Submit Feedback
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewForm && reviewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Submit Refund / Feedback
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded p-3 h-24"
              placeholder="Describe your issue or feedback..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewOrder(null);
                  setReason("");
                }}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderList;
