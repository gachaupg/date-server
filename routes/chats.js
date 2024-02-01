import express from "express";
import { createChat, getUserChat, getUserChats } from "../controllers/chats.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:id", getUserChats);
router.get("/user-chat/:firstId/:secondId", getUserChat);



export default router