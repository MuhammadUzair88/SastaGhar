import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery"],
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        image: {
          type: mongoose.Schema.Types.Mixed, // can be string or array
          required: true,
        },
        onSale: { type: Boolean, default: false },
        salePercentage: { type: Number, default: 0 },
        otherServices: { type: Boolean, default: false },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Packing",
        "Shipped",
        "Out for delivery",
        "Delivered",
      ],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
