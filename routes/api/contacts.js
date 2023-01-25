const express = require("express");

const {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact
} = require("../../controlles/controllers");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", changeContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
