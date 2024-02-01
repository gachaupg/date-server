import userContents from "../models/scripts.js";
import mongoose from "mongoose";

export const createPodicast = async (req, res) => {
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



export const RandomProducts = async (req, res) => {
  try {
    const numProductsToFetch = 10;
    let randomProducts = [];
    const count = await userContents.countDocuments();

    while (randomProducts.length < numProductsToFetch) {
      const randomIndex = Math.floor(Math.random() * count);

      const products = await userContents.find().skip(randomIndex).limit(numProductsToFetch);

      randomProducts = randomProducts.concat(products);
    }

    // Slice the array to ensure it contains exactly 5 products
    randomProducts = randomProducts.slice(0, numProductsToFetch);

    res.json(randomProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};









export const Addlikes = async (req, res) => {
  const { id } = req.params;

  try {
    const likeObject = { _id:id };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { likes: likeObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const RemoveLike = async (req, res) => {
  const { id } = req.params;

  try {
    const likeIdToRemove = id;

    await userContents.updateOne(
      { _id: id },
      { $pull: { likes: likeIdToRemove } }
    );
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Adddislikes = async (req, res) => {
  const { id } = req.params;

  try {
    const likeObject = { id };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { dislikes: likeObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const RemovedisLike = async (req, res) => {
  const { id } = req.params;

  try {
    const likeIdToRemove = id;

    await userContents.updateOne(
      { _id: id },
      { $pull: { dislikes: likeIdToRemove } }
    );
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllPodicasts = async (req, res) => {
  try {
    const userContent = await userContents.find();
    res.status(200).json(userContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getSinglePodicast = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userContents.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const getPodicastByUser = async (req, res) => {
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
