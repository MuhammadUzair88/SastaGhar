import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiDollarSign,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiEye,
  FiX,
} from "react-icons/fi";

const allowedStatuses = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({ show: false, data: [] });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/orders/all`
      );
      setOrders(res.data.orders || []);
      setFilteredOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReview = async (orderId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/reviews/${orderId}`
      );
      if (res.data.reviews && res.data.reviews.length > 0) {
        setReviewModal({
          show: true,
          data: res.data.reviews,
        });
      } else {
        toast.info("No review/refund request found.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch review data.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/api/orders/status/${orderId}`,
        {
          status: newStatus,
        }
      );
      toast.success("Order status updated!");
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/api/orders/${orderId}`
      );
      toast.success("Order deleted successfully.");
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Packing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Out for delivery":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
      case "Packing":
        return <FiPackage className="mr-2" />;
      case "Shipped":
      case "Out for delivery":
        return <FiTruck className="mr-2" />;
      case "Delivered":
        return <FiCheckCircle className="mr-2" />;
      default:
        return <FiPackage className="mr-2" />;
    }
  };

  const renderServiceImages = (images) => (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 w-16 h-16">
      {images?.slice(0, 4).map((img, i) => (
        <div key={i} className="bg-white border rounded-md overflow-hidden">
          <img
            src={img}
            alt={`img-${i}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;
    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }
    setFilteredOrders(result);
  }, [statusFilter, orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Review Modal */}
      {reviewModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
            <button
              onClick={() => setReviewModal({ show: false, data: [] })}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Review / Refund Requests
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {reviewModal.data.map((review, index) => (
                <div
                  key={review._id || index}
                  className="bg-gray-100 p-4 rounded-md border border-gray-300"
                >
                  <p className="text-sm text-gray-600 mb-2">
                    Submitted on:{" "}
                    {format(new Date(review.createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                  <div className="text-gray-800 text-sm whitespace-pre-line">
                    {review.reason}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4">
              <button
                onClick={() => setReviewModal({ show: false, data: [] })}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Filter */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer orders
            </p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Statuses</option>
            {allowedStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Orders Display */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center shadow">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500 mb-4">No orders available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-800 text-lg">
                        Order #{order._id.slice(0, 8)}
                      </h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <FiCalendar className="mr-2" />
                      {format(
                        new Date(order.createdAt),
                        "dd MMM yyyy, hh:mm a"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-800 text-lg">
                      ₨{order.totalAmount?.toLocaleString("en-PK")}
                    </p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="text-sm bg-white border border-gray-300 rounded-lg py-2 px-3"
                    >
                      {allowedStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {order.status === "Delivered" && (
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        title="Delete this order"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Rest of the content stays exactly the same */}
                {/* Order info, items, and optional review button */}
                {/* ... */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiUser /> Customer
                    </h4>
                    <p className="text-sm text-gray-800">{order.name}</p>
                    <p className="text-sm text-gray-600">{order.email}</p>
                    <p className="text-sm text-gray-600">{order.phoneNo}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiMapPin /> Address
                    </h4>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiDollarSign /> Payment
                    </h4>
                    <p className="text-sm text-gray-600">
                      Method: {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Order Items
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item, index) => {
                      const isService = item.otherServices;
                      const images = isService
                        ? item.image?.slice(0, 4)
                        : [item.image?.[0]];
                      return (
                        <div
                          key={index}
                          className="border rounded-lg p-3 bg-gray-50"
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-16">
                              {isService ? (
                                renderServiceImages(images)
                              ) : (
                                <img
                                  src={images[0]}
                                  alt={item.title}
                                  className="w-full h-full object-cover rounded-md border"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-800">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-semibold text-gray-700">
                                ₨
                                {(item.price * item.quantity).toLocaleString(
                                  "en-PK"
                                )}
                              </p>
                              {item.onSale && (
                                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                  On Sale
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {order.status === "Delivered" && (
                  <button
                    onClick={() => fetchReview(order._id)}
                    className="mt-3 inline-flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                  >
                    <FiEye /> See Review / Refund Request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;
