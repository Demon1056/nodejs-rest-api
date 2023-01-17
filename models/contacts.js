const fs = require("fs").promises;
const { json } = require("express");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");
async function readFile() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return contacts;
}

const listContacts = async () => {
  const contacts = await readFile()
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await readFile()
  const contactList = JSON.parse(contacts)
  const contact = contactList.find(tem => tem.id === contactId)
  console.log(contact);
  return contact
}

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
