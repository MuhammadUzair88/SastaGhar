
const Product=require('../Models/Product');



const CreateProduct=async(req,res)=>{

    const {name,price,image}=req.body;

    if(!name || !price || !image){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
        })
    }

    const newProduct=new Product ({
        name,
        price,
        image
    })

    try{
        await newProduct.save();
        res.status(201).json({
            success:true,
            message:"Product created Successfully",
        })

    }
    catch(err){
            res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }


}


// const UpdateProduct =async(req,res)=>{
//     const {id}=req.params;
//     const {name,price,image}=req.body;


//    try{
//     const product=await Product.findById(id);
//     if(!product){
//         return res.status(404).json({
//             success:false,
//             message:"Product not found"
//         })
//     }
//     product.name=name;
//     product.price=price;
//     product.image=image;
//     await product.save();
//     res.status(200).json({
//         sucess:true,

//     })
//    }


// }
const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true } // returns the updated doc
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error("Update Error:", err.message); // See error clearly
    res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};


const DeleteProduct=async(req,res)=>{
    const {id}=req.params;

    try{
     
        await Product.findByIdAndDelete(id);
        res.status(200).json({
           success:true,
           message:"Product Deleted"
        })

  } catch (err) {
    console.error("Update Error:", err.message); // See error clearly
    res.status(500).json({
      success: false,
      message: "Internal Error",
    });
}
}


const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json({
            success:true,
            products,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}







module.exports={
    CreateProduct,UpdateProduct,DeleteProduct,getProducts
}