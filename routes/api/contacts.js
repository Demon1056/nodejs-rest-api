const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactList = await listContacts();
  res.status(200).json(contactList);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  contact = await getContactById(contactId);
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  res.json(contact);
});

module.exports = router;
