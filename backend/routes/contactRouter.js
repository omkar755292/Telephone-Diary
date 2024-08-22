const express = require('express');
const { getContacts, createContact, deleteContact, getContact, updateContact, deleteContacts } = require('../controller/contactController');
const validateToken = require('../middleware/validateToken');

const contactRouter = express.Router();

contactRouter.use(validateToken);

contactRouter.route('/').get(getContacts);
contactRouter.route('/:id').get(getContact);
contactRouter.route('/').post(createContact);
contactRouter.route('/:id').put(updateContact);
contactRouter.route('/:id').delete(deleteContact);
contactRouter.route('/').delete(deleteContacts);

module.exports = contactRouter;