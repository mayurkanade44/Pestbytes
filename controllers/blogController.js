import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: "test title",
      caption: "sample caption",
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      comments: [
        {
          comment: "Nice Post",
          user: req.user._id,
        },
      ],
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
