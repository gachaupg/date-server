import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const PodicastSchema = mongoose.Schema({
  title: { type: String, },
  message: { type: String },
  status: { type: String,default:'unread' },
  userId: { type: String },

 
  date: { type: Number, default: Math.floor(Date.now() / (60 * 1000)) },
}, { timestamps: true });

const Notifications = mongoose.model("Notifications", PodicastSchema);

export default Notifications;
