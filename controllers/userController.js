import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!password || !email || !name)
      throw new Error("Please provide all values");

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

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) throw new Error("Please provide all values");

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    if (!(await user.comparePassword(password)))
      throw new Error("Invalid credentials");

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
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user) return res.status(200).json({ user });

    let error = new Error("User Not Found");
    error.statusCode = 404;
    next(error);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  try {
    let user = await User.findById(req.user.userId);

    if (!user) throw new Error("User does not exists");

    if (email !== user.email) {
      const alreadyExists = await User.findOne({ email });
      if (alreadyExists) throw new Error("Email id already exists");
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({ user, msg: "Profile successfully updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
