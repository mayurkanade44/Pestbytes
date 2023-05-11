import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/djc8opvcg/image/upload/v1683786516/Pestbytes/Avatar/profile_lqcjqg.png",
    },
    verificationCode: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.createJWT = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
