// Route for user login
import userModel from './../models/userModel.js';
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){

     const token =createToken(user._id)
     res.json({success:true,token,  user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      cartData: user.cartData,
    },})
    }
    else{
      res.json({success:false,message:'invalid credentials'})
    }


   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
     
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    
    //validating email format and strong password

    if(!validator.isEmail(email)){
      return res.json({ success: false, message: "Plz Enter a Valid Email" });
    }
    if(password.length<8){
      return res.json({ success: false, message: "Plz Enter a Strong Password" });
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

     const newUser=new userModel({
      name,
      email,
      password:hashedPassword
     })
     const user=await newUser.save()

    const token =createToken(user._id)

    res.json({success:true,token,  user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      cartData: user.cartData,
    },})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {

try {
  const {email,password}=req.body

   if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
    const token =jwt.sign(email+password,process.env.JWT_SECRET);
    res.json({success:true,token})
   }else{
     res.json({success:false,message:"INVALID CREDENTIALS"})
   }


} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}

};

export { loginUser, registerUser, adminLogin };
