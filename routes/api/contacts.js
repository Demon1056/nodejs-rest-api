const express = require("express");

const {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controlles/controllers");

const { tryCatchWrapper } = require("../../helpers/helpers");

const {
  schemaPost,
  schemaChange,
  schemaStatus
} = require("../../validation/validation.Schema.js");

const {
  validate
} = require("../../middleware/contacts_middleware");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post("/", validate(schemaPost), tryCatchWrapper(postContact));
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  validate(schemaChange),
  tryCatchWrapper(changeContact)
);
router.patch(
  "/:contactId/favorite",
  validate(schemaStatus),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
