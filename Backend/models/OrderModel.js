import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ['Cash on Delivery'], required: true },
  items: [
    {
      productId: { type: String, required: true },
      title: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  totalAmount: Number,
}, { timestamps: true });

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
