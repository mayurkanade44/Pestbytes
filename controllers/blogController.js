import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: "sample title",
      caption: "sample caption",
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
