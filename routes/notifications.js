import express from "express";
import { createNots, getNots, updateNotifications } from "../controllers/Notifications.js";

const router = express.Router();



router.get("/", getNots);
router.put("/:id", updateNotifications);
router.post("/:id", createNots);





export default router