import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const PodcastSchema = mongoose.Schema({
  title: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  place:{ type: String },
  
  date: { type: Number, default: Math.floor(Date.now() / (60 * 1000)) },
}, { timestamps: true });

const orders = mongoose.model("pmg", PodcastSchema);

export default orders;
