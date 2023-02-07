const { Users } = require("../models/users");
const { throwError } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "some text";

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  console.log(salt, password);
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
  User.token = token;
  return res.json({
    User,
  });
};

module.exports = {
  register,
  login,
};
