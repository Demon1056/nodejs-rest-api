
const express = require('express')
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')


const router = express.Router()

router.get('/', async (req, res, next) => {
  const contactList = await listContacts()
  res.json(contactList)
})

router.get('/:contactId', async (req, res, next) => {
  const { id } = req.params
  contact = await getContactById(id)
  res.json('ddff')
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
