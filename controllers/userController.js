import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import sgMail from "@sendgrid/mail";
import { capitalLetter } from "../utils/helpers.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!password || !email || !name)
      return res.status(400).json({ msg: "Please provide all values" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const verificationToken = crypto.randomBytes(40).toString("hex");

    name = capitalLetter(name);
    const link = `http://localhost:3000/verify-account?token=${verificationToken}&email=${email}`;
    const mail = await sendEmail({ name, email, link });
    if (!mail)
      return res.status(500).json({ msg: "Server error, try again later." });

    user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    return res.status(201).json({
      msg: `Verification email has been sent to your registered email id`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

const sendEmail = async ({ name, email, link }) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: { email: "noreply.epcorn@gmail.com", name: "PestBytes" },
      dynamic_template_data: {
        name: name,
        link: link,
      },
      template_id: "d-7949d5cffefe46a7b6a0eab95b71076e",
    };

    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyUser = async (req, res) => {
  const { verificationToken, email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ msg: "Verification Failed" });

    if (verificationToken !== user.verificationToken)
      return res.status(401).json({ msg: "Verification Failed" });

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res
      .status(200)
      .json({ msg: "Email has been successfully verified, please login." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email)
      return res.status(400).json({ msg: "Please provide all values" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(401).json({ msg: "Email verification still pending" });

    const passwordCheck = await user.comparePassword(password);

    if (!passwordCheck)
      return res.status(400).json({ msg: "Invalid credentials" });

    generateToken(res, user._id);

    return res.status(200).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        admin: user.admin,
      },
      msg: `Welcome ${user.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email)
      return res.status(400).json({ msg: "Please provide valid email" });

    const user = await User.findOne({ email });
    if (user) {
      const passwordToken = crypto.randomBytes(70).toString("hex");

      const tenMin = 1000 * 60 * 10;
      const resetPasswordExpiry = new Date(Date.now() + tenMin);

      user.passwordToken = passwordToken;
      user.resetPasswordExpiry = resetPasswordExpiry;

      await user.save();

      const link = `http://localhost:3000/reset-password?token=${passwordToken}&email=${email}`;

      const mail = await sendEmail({ name: user.name, email, link });

      if (!mail)
        return res
          .status(400)
          .json({ msg: "There was some error, try again later." });
    }

    return res
      .status(200)
      .json({ msg: "Please check your email for reset password link" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  try {
    if (!email || !password || !token)
      return res.status(400).json({ msg: "Please provide values" });

    const user = await User.findOne({ email });

    if (user) {
      const currentDate = new Date().toISOString;

      if (
        user.passwordToken === token &&
        user.resetPasswordExpiry > currentDate
      ) {
        user.password = password;
        user.passwordToken = null;
        user.resetPasswordExpiry = null;

        await user.save();
      }
    }

    return res
      .status(200)
      .json({ msg: "Successfully updated, redirecting to login page" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({
      userId: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      blogs: 10,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email, avatar } = req.body;
  try {
    let user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (email !== user.email) {
      const alreadyExists = await User.findOne({ email });
      if (alreadyExists)
        return res.status(400).json({ msg: "Email id already exists" });
    }

    user.name = capitalLetter(name);
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
      { _id: req.user._id },
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
