const { throwError } = require("../helpers/helpers.js");
const { Users } = require("../models/users.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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

module.exports = {
  validate,
  authorization,
};
