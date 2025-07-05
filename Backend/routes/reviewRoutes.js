import express from "express";
import ReviewModel from "../models/ReviewModel.js";

const router = express.Router();

// POST review/refund
router.post("/", async (req, res) => {
  try {
    const { orderId, phoneNo, email, address, reason } = req.body;

    if (!orderId || !phoneNo || !email || !address || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const review = new ReviewModel({ orderId, phoneNo, email, address, reason });
    await review.save();

    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) {
    console.error("Review submission failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ UPDATED: GET all reviews by orderId
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const reviews = await ReviewModel.find({ orderId });

    if (!reviews.length) {
      return res.status(404).json({ success: false, message: "No reviews found for this order." });
    }

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
