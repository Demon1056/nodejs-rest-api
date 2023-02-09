const express = require("express");

const { authorization } = require("../../middleware/middlewares");
const {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controlles/contacts.controllers");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { validate } = require("../../middleware/middlewares");

const {
  schemaPost,
  schemaChange,
  schemaStatus,
} = require("../../validation/validation.Schema.js");

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  tryCatchWrapper(authorization),
  tryCatchWrapper(getContacts)
);
contactsRouter.get(
  "/:contactId",
  tryCatchWrapper(authorization),
  tryCatchWrapper(getContact)
);
contactsRouter.post(
  "/",
  validate(schemaPost),
  tryCatchWrapper(authorization),
  tryCatchWrapper(postContact)
);
contactsRouter.delete(
  "/:contactId",
  tryCatchWrapper(authorization),
  tryCatchWrapper(deleteContact)
);
contactsRouter.put(
  "/:contactId",
  validate(schemaChange),
  tryCatchWrapper(authorization),
  tryCatchWrapper(changeContact)
);
contactsRouter.patch(
  "/:contactId/favorite",
  validate(schemaStatus),
  tryCatchWrapper(authorization),
  tryCatchWrapper(updateStatusContact)
);

module.exports = { contactsRouter };
