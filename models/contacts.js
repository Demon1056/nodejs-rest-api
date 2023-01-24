const { Contacts } = require("./contactServer")

const listContacts = async () => {
  const contacts = await Contacts.find();
  return contacts
};

const getContactById = async (contactId) => {
  const contact = Contacts.findById(contactId)
  return contact || null;
};

const removeContact = async (contactId) => {
  await Contacts.findByIdAndRemove(contactId);
};

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contacts.create({
    name,
    email,
    phone,
    favorite,
  });
  return newContact;
};

const updateContact = async (contactId, { name, phone, email, favorite }) => {
  contact = await Contacts.findByIdAndUpdate(contactId, { name, phone, email, favorite })
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
