import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  editComment,
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

router
  .route("/comment/:id")
  .post(authenticateUser, addComment)
  .patch(authenticateUser, editComment)
  .delete(authenticateUser, deleteComment);

export default router;
