import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const PodicastSchema = mongoose.Schema({
  title: { type: String, },
  userName: { type: String },
  cover: { type: Array },
  script: { type: String },

  likes:[{type:ObjectId,ref:"Auth"}],
  dislikes: [{type:ObjectId,ref:"Auth"}],
  comments: [],
  views: { type: Number, default: 0 },
  description: { type: String },
  playList: [],
  creator: { type: String },
  category: { type: String },

  hashtags: { type: String },
  userChannelLink: { type: String },
  socialMediaLinks: { type: String },
  contactDetails: { type: String },
  remarks: { type: String },
  date: { type: Number, default: Math.floor(Date.now() / (60 * 1000)) },
}, { timestamps: true });

const Podicast = mongoose.model("story", PodicastSchema);

export default Podicast;
