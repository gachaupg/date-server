import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Types;

const messageSchema = mongoose.Schema({
  chatId: String,
  senderId:String,
  text:String,
 
}, { timestamps: true });

const meassageModal = mongoose.model("mesasage", messageSchema);

export default meassageModal;
