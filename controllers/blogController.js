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
      comments: [
        {
          comment: "Nice Post xz",
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


