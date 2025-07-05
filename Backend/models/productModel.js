import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  stock: { type: String, required: true },
  date: { type: Number, required: true },

  // Sale fields
  onSale: { type: Boolean, default: false },
  salePercentage: { type: Number, default: 0 },

  // Single boolean for other services
  otherServices: { type: Boolean, default: false }
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);
export default productModel;
