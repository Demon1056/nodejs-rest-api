const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().min(3).alphanum().required(),
  email: Joi.string().min(3).email().required(),
  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

const schemaChange = Joi.object({
  name: Joi.string().min(3).alphanum(),
  email: Joi.string().min(3).email(),
  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^[0-9]+$/),
  favorite: Joi.boolean(),
});

const schemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaAuth = Joi.object({
  email: Joi.string().min(5).email(),
  password: Joi.string().min(6).max(8).alphanum(),
});

const schemaVerify = Joi.object({
  email: Joi.string().min(3).email().required(),
});
module.exports = {
  schemaPost,
  schemaChange,
  schemaStatus,
  schemaAuth,
  schemaVerify,
};
