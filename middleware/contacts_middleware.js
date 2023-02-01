const { throwError } = require("../helpers/helpers.js");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(throwError(400, error.message));
    }
    return next();
  };
};

module.exports = {
  validate
};
