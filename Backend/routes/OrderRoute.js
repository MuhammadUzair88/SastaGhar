import express from "express";
import OrderModel from "../models/OrderModel.js";


const router = express.Router();

router.post("/place", async (req, res) => {
  try {
    const { userId, name, address, paymentMethod, items, totalAmount } = req.body;

    const order = new OrderModel({ userId, name, address, paymentMethod, items, totalAmount });
    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 }); // most recent first
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add this route below the /all route
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
