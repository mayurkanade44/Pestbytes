import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  addComment,
  blogsByCategory,
  createBlog,
  deleteBlog,
  deleteComment,
  editComment,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  updateBlog,
} from "../controllers/blogController.js";
const router = express.Router();

router.route("/").post(authenticateUser, createBlog).get(getAllBlogs);
router.route("/singleBlog/like/:id").patch(authenticateUser, likeBlog);

router
  .route("/singleBlog/:id")
  .get(getSingleBlog)
  .delete(authenticateUser, deleteBlog)
  .patch(authenticateUser, updateBlog);

router
  .route("/comment/:id")
  .post(authenticateUser, addComment)
  .patch(authenticateUser, editComment)
  .delete(authenticateUser, deleteComment);

router.route("/category/:id").get(blogsByCategory)  

export default router;
