
import moment from "moment";
import mongoose, { Schema } from "mongoose";
import cron from "node-cron";
const { ObjectId } = mongoose.Types;
const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  }
})
const userContentSchema = mongoose.Schema(
  {
    test:{type:String,default:'hello'},
    title: { type: String },
    userName: { type: String },
    sellerName: { type: String },
   isBought:{type:Boolean,default:false},
    video: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: ObjectId, ref: "User" }],
    dislikes: [{ type: ObjectId, ref: "User" }],
    comments: [],
    email:{type:String},
    phone: { type: Number },
    description: { type: String },
    creator: { type: String },
    category: { type: String },
    images: { type: Array },
    hashtags: { type: String },
    twitter: { type: String },
    whatsapp: { type: String },
    instagram: { type: String },
    remarks: { type: String },
    additionalInfo: { type: String },
    createdAt: { type: Date, default: Date.now },
    brand: { type: String },
    feature: { type: String },
    feature1: { type: String },
    feature2: { type: String },
    feature3: { type: String },
    feature4: { type: String },
    specifications: { type: String },
    specifications1: { type: String },
    specifications2: { type: String },
    specifications3: { type: String },
    specifications4: { type: String },
    tell: { type: Number },
    price: { type: Number },
    age: { type: Number },
    discountPrice: { type: Number },
    discountPercentage: { type: Number },
    stock: { type: Number },
    userId: {
      type: String,
    },
    suggestions: {
      type: String,
    },
    reviews: [
      {
        userId: String,
        review: String,
        rating: Number,
        name: String,
      },
    ],
    // ratings: { type: Number, default: 0 },
    timeSinceUpload: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userContent = mongoose.model("userVedeoContents", userContentSchema);

// Function to update timeSinceUpload property for documents
const updateTimeSinceUpload = async () => {
  const currentTime = moment();
  const documents = await userContent.find();

  for (const doc of documents) {
    const createdAt = moment(doc.createdAt);
    const duration = moment.duration(currentTime.diff(createdAt));
    const minutes = Math.floor(duration.asMinutes());
    doc.timeSinceUpload = minutes;
    await doc.save();
  }
};

// Schedule the updateTimeSinceUpload function to run every minute
cron.schedule("* * * * *", updateTimeSinceUpload);

export default userContent;