const express = require("express");

const { authorization, upload } = require("../../middleware/middlewares");
const {
  register,
  login,
  logout,
  findCurrentUser,
  uploadAvatar,
} = require("../../controlles/auth.controller");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { validate } = require("../../middleware/middlewares");
const { schemaAuth } = require("../../validation/validation.Schema");

const authRouter = express.Router();

authRouter.post("/register", validate(schemaAuth), tryCatchWrapper(register));
authRouter.post("/login", validate(schemaAuth), tryCatchWrapper(login));
authRouter.post(
  "/logout",
  tryCatchWrapper(authorization),
  tryCatchWrapper(logout)
);
authRouter.get(
  "/current",
  tryCatchWrapper(authorization),
  tryCatchWrapper(findCurrentUser)
);
authRouter.patch(
  "/avatars",
  tryCatchWrapper(authorization),
  upload.single("avatarURL"),
  tryCatchWrapper(uploadAvatar)
);

module.exports = { authRouter };
