import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw new Error("User already exist");

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
    next(error);
  }
};
