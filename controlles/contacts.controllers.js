const { throwError } = require("../helpers/helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  chooseFavorite,
} = require("../helpers/contacts.functions");

const getContacts = async (req, res) => {
  const { user } = req;
  const contactList = await listContacts(user);
  return res.status(200).json(contactList);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(throwError(404, "Not found"));
  }
  return res.status(200).json(contact);
};

const postContact = async (req, res) => {
  newContact = await addContact(req);
  const { name, phone, email, owner } = newContact;
  return res.status(201).json({ name, phone, email, owner: owner._id });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(throwError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  return res.json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await chooseFavorite(contactId, favorite);
  if (!contact) {
    return next(throwError(404, " Not found "));
  }
  return res.status(200).json(contact);
};

module.exports = {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
