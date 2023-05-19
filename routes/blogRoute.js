import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController.js";
const router = express.Router();

router.route("/").post(authenticateUser, createBlog).get(getAllBlogs);
router
  .route("/singleBlog/:id")
  .get(authenticateUser, getSingleBlog)
  .delete(authenticateUser, deleteBlog)
  .patch(authenticateUser, updateBlog);

export default router;
