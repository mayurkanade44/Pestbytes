import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  forgotPassword,
  getUser,
  loginUser,
  registerUser,
  resetPassword,
  updateAvatar,
  updateUser,
  verifyUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-user").post(verifyUser);
router.route("/reset-password").post(resetPassword);
router.route("/forgot-password").post(forgotPassword);
router
  .route("/profile")
  .get(authenticateUser, getUser)
  .patch(authenticateUser, updateUser)
  .post(authenticateUser, updateAvatar);

export default router;
