import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const chatSchema = mongoose.Schema({
  members: Array,
  
}, { timestamps: true });

const chats = mongoose.model("chat", chatSchema);

export default chats;
