const express = require('express');
const router = express.Router()

const { getAllContact, createContact, updateContact, deleteContact, getContact } = require('../controllers/contact')


router.route('/').post(createContact).get(getAllContact)
router.route('/:id').get(getContact).delete(deleteContact).patch(updateContact)


module.exports = router