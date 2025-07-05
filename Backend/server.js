import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import OrderRouter from './routes/OrderRoute.js';
import router from './routes/reviewRoutes.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/orders',OrderRouter)
app.use("/api/reviews", router);

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>console.log('server started on PORT : '+ port))