import chatsModal from "../models/Chats.js";

export const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatsModal.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new chatsModal({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getUserChats = async (req, res) => {
  const id = req.params.id;
  try {
    const chats = await chatsModal.find({
      members: { $in: [id] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const getUserChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatsModal.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
