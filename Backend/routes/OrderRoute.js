import express from "express";
import OrderModel from "../models/OrderModel.js";

const router = express.Router();

// POST /api/orders/place
router.post("/place", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNo,
      address,
      paymentMethod,
      items,
      totalAmount,
    } = req.body;

    if (!userId || !name || !email || !phoneNo || !address || !paymentMethod || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const order = new OrderModel({
      userId,
      name,
      email,
      phoneNo,
      address,
      paymentMethod,
      items,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/all
router.get("/all", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/status/:orderId
router.put("/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Order Placed",
      "Packing",
      "Shipped",
      "Out for delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/orders/:orderId
router.delete("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


export default router;
