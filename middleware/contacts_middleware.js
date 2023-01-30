const { throwError } = require("../helpers/helpers.js");

const validatePost = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(throwError(400, error.message));
    }
    return next();
  };
};

const validatePut = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(throwError(400, error.message));
    }
    return next();
  };
};

const validatePatch = (schema) => {
  return (req, res, next) => {
    if (req.body.favorite === undefined) {
      return next();
    }
    return next(throwError(400, error.message));
  };
};

module.exports = {
  validatePost,
  validatePut,
  validatePatch,
};
