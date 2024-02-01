import express from "express";
import { Adddislikes, Addlikes, RandomProducts, RemoveLike, RemovedisLike, createPodicast, deletePodicast, getAllPodicasts, getPodicastByUser, getSinglePodicast, podicastViews, updatePodicast } from "../controllers/script.js";

const router = express.Router();

router.post("/", createPodicast);
router.get("/all-podicasts", getAllPodicasts);
router.get("/", RandomProducts);
router.get("/:id", getSinglePodicast);
router.get("/users-scripts/:id", getPodicastByUser);
router.delete("/delete-podicast/:id", deletePodicast);
router.patch("/update-podicast/:id", updatePodicast);
router.patch("/like/:id",Addlikes);
router.patch("/removelike/:id",RemoveLike);
router.patch("/dislike/:id",Adddislikes);
router.patch("/removedislikes/:id",RemovedisLike);
router.put('/views/:podicastId', podicastViews);




export default router