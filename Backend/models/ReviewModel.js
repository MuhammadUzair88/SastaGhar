import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  reason: { type: String, required: true },
}, { timestamps: true });

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
