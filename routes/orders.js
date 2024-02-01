import express from "express";
import { createOrder, forgotPassword, getAllOrders, getOrderByUser, getSingleOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
// router.post("/email", forgotPassword);
router.get("/", getAllOrders);

router.get("/:id", getSingleOrder);
router.get("/users-orders/:id", getOrderByUser);





export default router