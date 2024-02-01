import userContents from "../models/Notifications.js";
import mongoose from "mongoose";

export const createNots = async (req, res) => {
  const userData = req.body;

  const newUserContent = new userContents({
    ...userData,
    createdAt: new Date().toISOString(),
  });

  try {
    await newUserContent.save();
    res.status(201).json(newUserContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getNots = async (req, res) => {
  try {
    const userContent = await userContents.find().sort({createdAt:-1});
    res.status(200).json({success:true,userContent});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const updateNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userContents.findById(id);
    user.status? user.status="read": user.status
    await user.save()
    const nots = await userContents.find().sort({createdAt:-1});

    res.status(200).json({success:true,nots});
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const getOrderByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await userContents.find({ creator: id });
  res.status(200).json(userTours);
};

export const deletePodicast= async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }
    await userContents.findByIdAndRemove(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const podicastViews = async (req, res) => {
    const { videoId } = req.params;
    const userIP = req.ip; // Get user's IP address
  
    try {
      const updatedVideo = await userContents.findOneAndUpdate(
        { videoId, 'views.ipAddress': { $ne: userIP } }, // Ensure the IP hasn't viewed before
        { $push: { views: { ipAddress: userIP } }, $inc: { viewCount: 1 } }, // Increment view count and add IP
        { new: true, upsert: true } // Return the updated video or create a new entry if not found
      );
  
      res.status(200).json(updatedVideo);
    } catch (error) {
      console.error('Error updating view count:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
export const updatePodicast = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    vedeo,
    category,
    hashtags,
    userChanellLink,
    socialMediaLinks,
    playList,
    contactDetails,
    remarks,
    additionalInfo,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }

    const updateduser = {
      title,
      description,
      vedeo,
      category,
      hashtags,
      userChanellLink,
      socialMediaLinks,
      playList,
      contactDetails,
      remarks,
      additionalInfo,
      _id: id,
    };
    await userContents.findByIdAndUpdate(id, updateduser, { new: true });
    res.json(updateduser);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
