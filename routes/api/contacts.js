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
} = require("../../validation/validation.Schemajs");

const {
  validatePost,
  validatePut,
  validatePatch,
} = require("../../middleware/contacts_middleware");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post("/", validatePost(schemaPost), tryCatchWrapper(postContact));
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  validatePut(schemaChange),
  tryCatchWrapper(changeContact)
);
router.patch(
  "/:contactId/favorite",
  validatePatch(schemaChange),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
