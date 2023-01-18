const fs = require("fs").promises;
const shortid = require("shortid");
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
  const contact = contactList.filter(({ id }) => id == contactId)
  return contact
}

const removeContact = async (contactId) => { }

const addContact = async ({ name,
  email,
  phone }) => {
  id = shortid.generate();
  const newContact = {
    name,
    email,
    phone,
    id,
  };
  const contacts = await readFile()
  const contactList = JSON.parse(contacts)
  contactList.push(newContact)
  return newContact
}

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
