import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";
const router = express.Router();

router.route("/create").post(authenticateUser, createBlog).get(getAllBlogs);
router.route("/singleBlog/:id").get(authenticateUser, getSingleBlog);

export default router;
