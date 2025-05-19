const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();

dotenv.config();

app.use(express.json());

app.use(cors())


//Routes

const ProductRoutes=require('./Routes/Product');

app.use('/api/v1/product',ProductRoutes);

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });



app.listen(process.env.PORT|| 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT||5000}`)
})
