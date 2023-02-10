const { throwError } = require("../helpers/helpers.js");
const { Users } = require("../models/users.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();
const { JWT_SECRET } = process.env;

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(throwError(400, error.message));
    }
    return next();
  };
};

const authorization = async (req, res, next) => {
  const Header = req.headers.authorization || "";
  const [type, token] = Header.split(" ");
  if (type !== "Bearer" || !token) {
    return next(throwError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(id);
    req.user = user;
  } catch (error) {
    return next(error);
  }

  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  validate,
  authorization,
  upload,
};
