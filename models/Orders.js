import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const PodicastSchema = mongoose.Schema({
  userId: { type: String,default:'2' },
  userName: { type: String },
  sellerName: { type: String },
  email: { type: String },
  script: { type: String },
  sellerEmail:{ type: String },
  title:{type:String},
  amount: {type:String},
  reviews: [],
  category: { type: String },
  description: { type: String },
 
  owner: { type: String },
  age: { type: String },

  tell: { type: String },
  phone: { type: String },
  productId: { type: String },
  contactDetails: { type: String },
  remarks: { type: String },
  date: { type: Number, default: Math.floor(Date.now() / (60 * 1000)) },
}, { timestamps: true });

const orders = mongoose.model("Order", PodicastSchema);

export default orders;
