import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { createBlog } from "../controllers/blogController.js";
const router = express.Router();

router.route("/create").post(authenticateUser, createBlog);

export default router;
