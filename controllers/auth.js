import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModal from "../models/auth.js";
import nodemailer from "nodemailer";
import cloudinary from "../utils/cloudinary.js";

const secret =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
import userModel from "../models/auth.js";

import dotenv from "dotenv";
import ejs from "ejs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import sendMail from "../utils/SendMail.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";

import bcrypt from "bcrypt";

// Load environment variables
dotenv.config();

// Register a user
export const registerUser = async (req, res, next) => {
  const {
    email,
    password,
    phone,
    avatar,
    name,
    userName,
    date,
    subscribers,
    subscribed,
    unSubscribed,
    isAdmin,
    img,
    country,
  } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if (img) {
    //   const uploadedResponse = await cloudinary.uploader.upload(img, {
    //     upload_preset: "peter-main",
    //   });

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt?.hash(password, 12);

    const result = await UserModal.create({
      email,
      unSubscribed,
      avatar,
      subscribers,
      subscribed,
      userName,
      password: hashedPassword,
      name,
      isAdmin,
      img,
      phone,
      country,
      date,
    });

    const token = jwt.sign(
      {
        phone: result.phone,
        email: result.email,
        country: result.country,
        img: result.img,
        id: result._id,
        isAdmin: result.isAdmin,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
    // }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

  // try {
  //   const { name, email, code, password } = req.body;
  //   const oldUser = await userModel.findOne({ email });
  //   if (oldUser) {
  //     return res
  //       .status(500)
  //       .json({ status: 500, message: "User with that email already exists" });
  //   }
  //   const user = {
  //     name,
  //     email,
  //     password,
  //     code,
  //   };

  //   const activationToken = createActivationToken(user);

  //   const activationCode = activationToken.activationCode;
  //   const data = { user: { name: user.name }, activationCode };

  //   const currentModuleURL = import.meta.url;
  //   const currentModulePath = fileURLToPath(currentModuleURL);
  //   const currentDir = dirname(currentModulePath);

  //   // Specify the correct template name here
  //   const template = "Mail.ejs"; // Replace with your actual template file name

  //   const html = await ejs.renderFile(
  //     path.join(currentDir, "../mails", template), // Update the path to the template
  //     data
  //   );
  //   try {
  //     await sendMail({
  //       email: user.email,
  //       to: user.email, // This should be the recipient's email address
  //       subject: "Activate account",
  //       template: "Mail.ejs",
  //       data,
  //     });

  //     res.status(200).json({
  //       status: true,
  //       message: `Please check your email ${user.email} to activate your account`,
  //       activationToken: activationToken.token,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return next(new Error(error.message));
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return next(new Error(error.message));
  // }
};
// Create activation token
export const createActivationToken = (user) => {
  const activationCode = `${Math.floor(
    1000 + Math.random() * 9000
  ).toString()}`;
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "100m",
    }
  );
  return { token, activationCode };
};

// Activate user
export const activateUser = async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activation_code) {
      return res.status(400).json({ message: "Invalid activation token" });
    }

    const { name, email, password } = newUser.user;
    console.log(password);
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(500).json({
        status: 500,
        message: "User with that email address already exists",
      });
    }

    // Ensure that the 'password' field is set correctly
    const user = await userModel.create({
      name,
      email,
      password,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// register api 'users must use their original emails

export const signup = async (req, res) => {
  const {
    email,
    password,
    phone,
    name,
    userName,
    date,
    subscribers,
    subscribed,
    unSubscribed,
    isAdmin,
    img,
    country,
  } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if (img) {
    //   const uploadedResponse = await cloudinary.uploader.upload(img, {
    //     upload_preset: "peter-main",
    //   });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      unSubscribed,
      subscribers,
      subscribed,
      userName,
      password: hashedPassword,
      name,
      isAdmin,
      img,
      phone,
      country,
      date,
    });

    const token = jwt.sign(
      {
        phone: result.phone,
        email: result.email,
        country: result.country,
        img: result.img,
        id: result._id,
        isAdmin: result.isAdmin,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ zz });
    // }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    // if (!isPasswordCorrect)  return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
// googleSignIn api

export const googleSignIn = async (req, res, next) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });

    if (user) {
      // User already exists, generate a token and send it back
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      // User doesn't exist, create a new user and generate a token
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new UserModal({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      const result = await UserModal.create({
        email: req.body.email,
        name: newUser.name,
        // Add other properties from newUser that you want to save
      });

      const token = jwt.sign(
        {
          phone: result.phone,
          email: result.email,
          profilePicture: req.body.photo,

          id: result._id,
          isAdmin: result.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const { password: hashedPassword2, ...rest } = result._doc;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModal.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "profilePicture",
      "avatar",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};

// get all Users  api

export const getUsers = async (req, res) => {
  try {
    // const tours = await UserModal.find();
    // res.status(200).json(tours);

    const users = await UserModal.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModal.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }
    await UserModal.findByIdAndRemove(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, country, password, avator, phone } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }

    const updateduser = {
      phone,
      email,
      country,
      password,
      avator,
      name,
      _id: id,
    };
    await UserModal.findByIdAndUpdate(id, updateduser, { new: true });
    res.json(updateduser);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const updateSeller = async (req, res) => {
  const { id } = req.params;
  const {
    payemail,
    payname,
    images,
    payuserid,
    trxref,
    message,
    adTitle,
    adSize,
    asImages,
    adVideos,
    adAmount,
    adDesc,
    status,
    amount,
    county,
    paytitle,
    street,
    title,
    desc,
    
    twitter,
    size,
    road,
    houseNo,
    tell,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }

    const updateduser = {
      title,
      payemail, payname, paytitle, payuserid, amount,
      images,
      county,
      street,
      road,
      houseNo,
      tell,
      desc,
      Ig:new Date(),
      twitter,
      trxref,
      adTitle,
      adSize,
      asImages,
      adDesc,
      adVideos,
      adAmount,
      message,
      status,
      size,
      isSeller: true,
      updatedAt: new Date(),
      _id: id,
    };
    await UserModal.findByIdAndUpdate(id, updateduser, { new: true });
    res.json(updateduser);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
// forgotPassword api

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      res.status(404).json({ message: "user with that email does not exist" });
    }
    const resetToken = secret + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      resetToken,
      { expiresIn: "1hr" }
    );
    const link = `http://localhost:5000/users/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 587,
      auth: {
        user: "worldofhustles@gmail.com",
        pass: "tewcczqvepiskpbm",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var mailOptions = {
      from: "worldofhustles@gmail.com",
      to: email,
      subject: "reset password",
      text: link,
    };
    // var mailOptions = {
    //   from: "youremail@gmail.com",
    //   to: "thedebugarena@gmail.com",
    //   subject: "Password Reset",
    //   text: link,
    // };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "password reset link sent to your email" });
  } catch (error) { }
};

// password reset ui html ejs

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secretToken = secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secretToken);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

export const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secretToken = secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secretToken);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await UserModal.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    // res.json({ status: "password updated" });
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Not Verified" });
  }
};
