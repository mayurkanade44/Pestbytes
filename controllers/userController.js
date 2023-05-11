import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!password || !email || !name)
      return res.status(400).json({ msg: "Please provide all values" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = await User.create({ name, email, password });

    return res.status(201).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        admin: user.admin,
        token: await user.createJWT(),
      },
      msg: `Welcome ${user.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!password || !email)
      return res.status(400).json({ msg: "Please provide all values" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!(await user.comparePassword(password)))
      return res.status(400).json({ msg: "Invalid credentials" });

    return res.status(200).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        admin: user.admin,
        token: await user.createJWT(),
      },
      msg: `Welcome ${user.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  try {
    let user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (email !== user.email) {
      const alreadyExists = await User.findOne({ email });
      if (alreadyExists)
        return res.status(400).json({ msg: "Email id already exists" });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({ user, msg: "Profile successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "Pestbytes/Avatar",
        quality: 50,
      }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { avatar: result.secure_url },
      {
        new: true,
        runValidators: true,
      }
    );

    return res
      .status(200)
      .json({ msg: "Profile picture updated", link: result.secure_url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};
