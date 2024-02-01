import UserModal from "../models/auth.js";
import userContents from "../models/pmg.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const createPmg = async (req, res) => {
  const userData = req.body;

  const newUserContent = new userContents({
    ...userData,
    date: new Date(), // Set the upload time to the current time
  });

  try {
    await newUserContent.save();
    res.status(201).json(newUserContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export const getPMG = async (req, res) => {
  try {
    const allProducts = await userContents.find();

    // Shuffle the array to get random order

    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to shuffle an array



export const Addlikes = async (req, res) => {
  const { id } = req.params;

  try {
    const likeObject = { _id: "64c21359c721da6ce2413034" };

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
    const likeIdToRemove = "64c214e2c721da6ce241303d";

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
    const likeObject = { _id: "64c21359c721da6ce241303f" };

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
    const likeIdToRemove = "64c21359c721da6ce241303a";

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

export const Addsubscribers = async (req, res) => {
  const { id } = req.params;

  try {
    const subscriberObject = { _id: "64c21359c721da6ce2413034" };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { subscribers: subscriberObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Removesubscriber = async (req, res) => {
  const { id } = req.params;

  try {
    const subscriberIdToRemove = "64c21359c721da6ce241303a";

    await userContents.updateOne(
      { _id: id },
      { $pull: { subscribers: subscriberIdToRemove } }
    );
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Addissubscribers = async (req, res) => {
  const { id } = req.params;

  try {
    const subscriberObject = { _id: "64c21359c721da6ce241303f" };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { subscriberObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Removedissubscriber = async (req, res) => {
  const { id } = req.params;

  try {
    const subscriberIdToRemove = "64c21359c721da6ce241303a";

    await userContents.updateOne(
      { _id: id },
      { $pull: { subscriberIdToRemove } }
    );
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUserContents = async (req, res) => {
  try {
    const userContent = await userContents.find();
    res.status(200).json(userContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getSingleUserContent = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userContents.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const getContentsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await userContents.find({ creator: id });
  res.status(200).json(userTours);
};

export const deleteUserContent = async (req, res) => {
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

export const viewsUserContent = async (req, res) => {
  const { videoId } = req.params;
  const userIP = req.ip; // Get user's IP address

  try {
    const updatedVideo = await userContents.findOneAndUpdate(
      { _id: videoId, "views.ipAddress": { $ne: userIP } },
      { $push: { views: { ipAddress: userIP } }, $inc: { viewCount: 1 } },
      { new: true }
    );

    if (updatedVideo) {
      const playlist = updatedVideo.playlists.find(
        (playlist) => playlist.name === "Watched Videos"
      );
      if (playlist) {
        const existingVideoIndex = playlist.videos.findIndex((video) =>
          video._id.equals(videoId)
        );
        if (existingVideoIndex === -1) {
          playlist.videos.push(updatedVideo);
          await updatedVideo.save();
        }
      }
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UserContentPlayList = async (req, res) => {
  const { videoId } = req.params;
  const userIP = req.ip; // Get user's IP address

  try {
    console.log("Request received. Video ID:", videoId, "IP Address:", userIP);

    const updatedVideo = {
      _id: videoId,
      ipAddress: userIP,
    };

    console.log("Updating playlist for user with IP:", userIP);

    // Update the user's playlist
    const user = await userContents.findOne({ "views.ipAddress": userIP });
    console.log("Retrieved user from database:", user);

    if (user) {
      const playlist = user.playlists.find(
        (playlist) => playlist.name === "Watched Videos"
      );
      console.log("Playlist:", playlist);

      if (playlist) {
        playlist.videos.push(updatedVideo._id);
        await user.save();
        console.log("Playlist updated.");
      }
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserContent = async (req, res) => {
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

export const Questions = async (req, res, next) => {
  try {
    const { comment, commentRepries, productId, commentId } = req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(404)
        .json({ message: `No product exists with id: ${productId}` });
    }

    const product = await userContents.findById(productId);

    // Check if the comment ID already exists
    // const productsData = product?.comments?.find((item) => item._id === commentId);
    // if (productsData) {
    //   return res.status(404).json({ message: `Comment already exists with id: ${commentId}` });
    // }

    const newQuestion = {
      user: req.UserModal,
      comment,
      commentRepries,
      productId,
    };

    // Add the new question to the product's comments array
    product.comments.push(newQuestion);

    // Save the updated product to the database
    await product.save();

    // Success response
    res.status(200).json({ message: "Question added successfully", product });
  } catch (error) {
    // Error response
    res.status(500).json({ message: "Oops! Data not found" });
  }
};

export const addReview = async (req, res, next) => {
  const { userId, review, rating, name } = req.body;
  const { id } = req.params;
  try {
    // Find the product by id
    const product = await userContents.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `No product exists with id: ${id}` });
    }

    // Add a new review to the reviews array
    product.reviews.push({ userId, review, rating, name });
    console.log(product.reviews);
    // Save the updated product to the database
    await product.save();

    // Success response with the updated product
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    // Handle errors, for now, sending a generic error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};
