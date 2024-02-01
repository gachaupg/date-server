import express from "express";
import  { createUser,RemoveLike,Addlikes,Adddislikes,RemovedisLike, 
    deleteUserContent, getAllUserContents, getContentsByUser, getSingleUserContent, updateUserContent, Addsubscribers, Addissubscribers, Removesubscriber, Removedissubscriber, viewsUserContent, UserContentPlayList, RandomProducts, Questions, addReview } from '../controllers/Products.js'
import auth from "../middleware/auth.js";
import { createPmg, getPMG } from "../controllers/pmg.js";
const router = express.Router();

router.post("/", createPmg);
router.get("/all", getPMG);



export default router