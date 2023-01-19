const express = require("express");

const {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact
} = require("../../controlles/controllers");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", changeContact);

module.exports = router;
