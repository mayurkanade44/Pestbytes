import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: "test title absd njb",
      caption: "sample caption xz",
      body: {
        type: "doc",
        content: [],
      },
      photo: "",

      user: req.user._id,
    });

    const newBlog = await blog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate([
      {
        path: "user",
        select: "name avatar",
      },
      {
        path: "comments.user",
        select: "name avatar",
      },
    ]);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    await Blog.deleteOne({ _id: blog._id });
    return res.json({ msg: "Blog removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "user",
      select: "name avatar",
    });

    res.json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    if (!comment)
      return res.status(400).json({ msg: "Please provide valid comment" });

    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const alreadyCommented = blog.comments.find(
      (c) => c.user.toString() === req.user._id.toString()
    );

    if (alreadyCommented)
      return res
        .status(400)
        .json({ msg: "You have already commented on this blog" });

    const newComment = {
      comment: comment,
      user: req.user._id,
    };

    blog.comments.push(newComment);

    await blog.save();

    return res.status(201).json({ msg: "Comment added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const editComment = async (req, res) => {
  const { comment } = req.body;
  try {
    if (!comment)
      return res.status(400).json({ msg: "Please provide valid comment" });

    const ids = req.params.id.split("_");

    const blog = await Blog.findById(ids[0]);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    for (let com of blog.comments) {
      if (com._id.toString() === ids[1]) {
        com.comment = comment;
      }
    }

    await blog.save();
    return res.json({ msg: "Comment updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const ids = id.split("_");

    const blog = await Blog.findById(ids[0]);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const comments = blog.comments.filter((c) => c._id.toString() !== ids[1]);
    blog.comments = comments;
    await blog.save();

    return res.json({ msg: "comment removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.json(404).json({ msg: "Blog not found" });

    const userId = req.user._id;

    const alreadyLiked = blog.likes.find(
      (id) => id.toString() === userId.toString()
    );
    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else blog.likes.push(userId.toString());

    await blog.save();
    return res.json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};
