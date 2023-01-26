const express = require("express");

const {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact
} = require("../../controlles/controllers");

const {
  schemaPost,
  schemaChange
} = require('../../validation/validation.Schemajs')

const { validatePost, validatePut, validatePatch, } = require('../../middleware/contacts_middleware')

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", validatePost(schemaPost), postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validatePut(schemaChange), changeContact);
router.patch("/:contactId/favorite", validatePatch(schemaChange), updateStatusContact);

module.exports = router;
