const express = require("express");

const { register, login } = require("../../controlles/auth.controller");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { schemaAuth } = require("../../validation/validation.Schema");

const { validate } = require("../../middleware/contacts_middleware");
const authRouter = express.Router();

authRouter.post("/register", validate(schemaAuth), tryCatchWrapper(register));
authRouter.post("/login", validate(schemaAuth), tryCatchWrapper(login));

module.exports = authRouter;
