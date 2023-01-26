const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    chooseFavorite
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
    const contactList = await listContacts();
    res.status(200).json(contactList);
}

const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        return res.status(404).json({ "message": "Not found" });
    }
    res.status(200).json(contact);
}

const postContact = async (req, res, next) => {
    newContact = await addContact(req.body);
    res.status(201).json(newContact);
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId)
    if (!contact) { return res.status(404).json({ "message": "Not found" }) }
    await removeContact(contactId);
    res.json({ message: "contact deleted" });
}

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    res.json(contact);
}

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body
    const contact = await chooseFavorite(contactId, favorite);
    res.status(200).json(contact);
}
module.exports = {
    getContact,
    getContacts,
    postContact,
    deleteContact,
    changeContact,
    updateStatusContact
}
