import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';
import userModel from '../models/userModel.js';

const cartRouter = express.Router();

cartRouter.post('/get', getUserCart);
cartRouter.post('/add', addToCart);
cartRouter.post('/update', updateCart);
// backend/routes/cart.js
cartRouter.post("/clear", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      user.cartData = {}; // Clear the cart
      await user.save();
      return res.json({ success: true, message: "Cart cleared" });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


export default cartRouter;