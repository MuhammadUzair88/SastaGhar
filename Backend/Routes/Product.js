
const express=require('express');
const { CreateProduct, UpdateProduct, DeleteProduct, getProducts } = require('../controller/Product');

const router=express.Router();


router.post('/create',CreateProduct);
router.put('/update/:id',UpdateProduct);
router.delete('/delete/:id',DeleteProduct);
router.get('/get',getProducts);

module.exports=router;