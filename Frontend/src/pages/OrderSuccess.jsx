import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600">Order Successful!</h2>
        <p className="mt-2 text-gray-600">Thank you for shopping with us.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
