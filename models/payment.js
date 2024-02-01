import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const PodicastSchema = mongoose.Schema({
  userId: { type: String },
  userName: { type: String },
  sellerName: { type: String },
  email: { type: String },
  net_amount: { type: Number },
  sellerEmail:{ type: String },
  account:{type:String},
  state: {type:Boolean, defaul:"Pending"},
  reviews: [],
  tracking_id: { type: String },
  description: { type: String },
 
  updated_at: { type: String },
  age: { type: String },

  charges: { type: String },
  phone: { type: String },
  productId: { type: String },
  meta: {  },
  remarks: { type: String },
  date: { type: Number, default: Math.floor(Date.now() / (60 * 1000)) },
}, { timestamps: true });

const orders = mongoose.model("Payment", PodicastSchema);

export default orders;
