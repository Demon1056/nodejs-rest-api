const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { throwError } = require("../helpers/helpers");
const { Users } = require("../models/users.model");

dotenv.config();

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await Users.create({
      email,
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
    const userLogout = await Users.findByIdAndUpdate(
      user._id,
      { token: "" },
      { new: true }
    );
    return res.status(204).json({ message: "success logout" });
  } catch (error) {
    next(error);
  }
};

const findCurrentUser = async (req, res, next) => {
  console.log(req.user);
  const { email, subscription } = req.user;
  return res.status(200).json({ email, subscription });
};

module.exports = {
  register,
  login,
  logout,
  findCurrentUser,
};
