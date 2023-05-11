import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getUser,
  loginUser,
  registerUser,
  updateAvatar,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(authenticateUser, getUser)
  .patch(authenticateUser, updateUser)
  .post(authenticateUser, updateAvatar);

export default router;