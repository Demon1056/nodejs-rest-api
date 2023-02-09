const { Contacts } = require("../models/contacts.model");

const listContacts = async (user) => {
  const contacts = await Contacts.find({ owner: user._id });
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = Contacts.findById(contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  await Contacts.findByIdAndRemove(contactId);
};

const addContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const { user } = req;
  const newContact = await Contacts.create({
    name,
    email,
    phone,
    favorite,
    owner: user,
  });

  return newContact;
};

const updateContact = async (contactId, { name, phone, email, favorite }) => {
  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { name, phone, email, favorite },
    { new: true }
  );
  return contact;
};
const chooseFavorite = async (contactId, favorite) => {
  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  chooseFavorite,
};
