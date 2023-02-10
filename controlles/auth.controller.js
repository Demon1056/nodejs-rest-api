const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { throwError } = require("../helpers/helpers");
const { Users } = require("../models/users.model");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

dotenv.config();

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  try {
    const savedUser = await Users.create({
      email,
      avatarURL,
      password: hashedPassword,
    });
    return res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(throwError(409, "Email in use"));
    }
    throw error;
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const User = await Users.findOne({
    email,
  });
  if (!User) {
    return next(throwError(401, "Email or password is wrong"));
  }
  const isPasswordValid = await bcrypt.compare(password, User.password);
  if (!isPasswordValid) {
    return next(throwError(401, "Email or password is wrong"));
  }
  const payload = { id: User._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const updateUser = await Users.findByIdAndUpdate(
    User._id,
    { token: token },
    { new: true }
  );
  return res.json({
    token,
    user: {
      email: updateUser.email,
      subscription: updateUser.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { user } = req;
  try {
    await Users.findByIdAndUpdate(user._id, { token: "" });
    return res.status(204).json({ message: "success logout" });
  } catch (error) {
    return next(error);
  }
};

const findCurrentUser = async (req, res, next) => {
  console.log(req.user);
  const { email, subscription } = req.user;
  return res.status(200).json({ email, subscription });
};

const uploadAvatar = async (req, res, next) => {
  const { user } = req;
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../tmp", filename);
  const avatar = await Jimp.read(tmpPath);
  await avatar.resize(250, 250);
  await avatar.writeAsync(tmpPath);
  const publicPath = path.resolve(__dirname, "../public/avatars", filename);
  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return next(error);
  }
  try {
    await Users.findByIdAndUpdate(user._id, { avatarURL: publicPath });
  } catch (error) {
    return next(error);
  }
  return res.status(200).json({ avatarURL: publicPath });
};

module.exports = {
  register,
  login,
  logout,
  findCurrentUser,
  uploadAvatar,
};
