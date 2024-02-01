import bcrypt from "bcrypt";
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    name: { type: String },
    code: { type: String },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value); // Use the email regex pattern
        },
        message: "Please enter a valid email.",
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return passwordRegexPattern.test(value); // Use the password regex pattern
        },
        message:
          "Please enter a valid password (8 characters long with both letters and numbers)",
      },
      select: false,
    },
    // seller
    title:{type:String},
    payemail:{type:String},
    isBought:{type:Boolean,default:false},

    paytitle:{type:String},
    amount:{type:Number,default:0},
    payname:{type:String},
    payuserid:{type:String},
    trxref:{type:String},
    message:{type:String},
    status:{type:String},
    hellp:{type:String},
    adTitle:{type:String},
    adSize:{type:String},
    adDesc:{type:String},
    adAmount:{type:Number},
    adImages:{type:Array},
    adVideos:{type:Array},
    size:{type:String},
    twitter:{type:String},
    Ig:{type:String},
    desc:{type:String},
    images:{type:Array},
    county:{type:String},
    street:{type:String},
    road:{type:String},
    phone:{type:Number},
    houseNo:{type:String},
    tell:{type:String},
    avatar: {
      type:String
    },
    role: { type: String, default: "user" },
    
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSeller: { type: Boolean,default:false },

    purchasedItems: [{ itemId: String }],
    creationTime: { type: Date, default: Date.now },
    minutesFromCreation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });
// access token
// userSchema.methods.signAccessToken = function () {
//   // Generate and return an access token using jwt.sign()
//   const accessToken = jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN, { expiresIn: '5d' });
//   return accessToken;
// };

// userSchema.methods.signRefreshToken = function () {
//   // Generate and return a refresh token using jwt.sign()
//   const refreshToken = jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
//   return refreshToken;
// };
// userSchema.methods.comparePassword = async function (meteredPassword) {
//   return await bcrypt.compare(meteredPassword, this.password);
// };

// userSchema.methods.calculateMinutesFromCreation = async function () {
//   const currentTime = new Date();
//   const minutesFromCreation = Math.floor(
//     (currentTime - this.creationTime) / (1000 * 60)
//   );
//   this.minutesFromCreation = minutesFromCreation;
//   await this.save();
// };

export default mongoose.model("User", userSchema);
