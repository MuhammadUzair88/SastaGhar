import productModel from "../models/productModel.js";
import userModel from './../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId]; // remove item from cart
    } else {
      cartData[itemId] = quantity; // update quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart=async(req,res)=>{
    try{
        const {userId}=req.body;
        const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

     res.json({success:true,cartData})
    }
 catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
}
export {addToCart,updateCart,getUserCart}