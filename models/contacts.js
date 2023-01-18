const fs = require("fs").promises;
const shortid = require("shortid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");

const readFile = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactList = JSON.parse(contacts);
  return contactList;
};

const writeFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readFile();
  return contacts;
};

const getContactById = async (contactId) => {
  const contactList = await readFile();
  const contact = contactList.filter(({ id }) => id == contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contactList = await readFile();
  const updateContacts = contactList.filter(({ id }) => id !== contactId);
  writeFile(updateContacts);
};

const addContact = async ({ name, email, phone }) => {
  id = shortid.generate();
  const newContact = {
    name,
    email,
    phone,
    id,
  };
  const contactList = await readFile();
  contactList.push(newContact);
  writeFile(contactList);
  return newContact;
};

const updateContact = async (contactId, { name, phone, email }) => {
  const contactList = await readFile();
  contactList.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name ? name : contact.name;
      contact.email = email ? email : contact.email;
      contact.phone = phone ? phone : contact.phone;
    }
  });
  writeFile(contactList);
  const contact = contactList.filter(({ id }) => id == contactId);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
