import express from "express";
import {
  deleteUser,
  getUser,
  forgotPassword,
  getUsers,
  googleSignIn,
  signin,
  signup,
  updateUser,
  resetPassword,
  postResetPassword,
  registerUser,
  activateUser,
  loginUser,
  updateSeller,
  signout,
  getAllUsers
} from "../controllers/auth.js";

const router = express.Router();

// all user routes

router.post("/register", registerUser);
router.post('/activate-user',activateUser)
router.post("/login", loginUser);
router.get("/all-users", getUsers);
router.get("/all", getAllUsers);
router.get("/user-profile/:id", getUser);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-user/:id", updateUser);
router.patch("/update-seller/:id", updateSeller);
router.post("/google-signin", googleSignIn);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
router.post("/reset-password/:id/:token", postResetPassword);
router.get('/signout', signout);
export default router;
