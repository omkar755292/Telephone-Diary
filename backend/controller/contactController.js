const redisClient = require("../config/redisClient");
const contactModel = require("../models/contactModel");
const asyncHandler = require('express-async-handler')

//desc: Get all Contact
//method: GET /api/contact
//access: Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.id });

    // Set cache with 1-hour expiration
    const key = req.user.id;
    await redisClient.set(key, JSON.stringify(contacts), { EX: 360 });

    res.status(200).json(contacts);
});

//desc: Get Contact by id
//method: GET /api/contact/id
//access: Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id != req.user.id) {
        res.status(401);
        throw new Error("user doesnot have permission to access this contact");
    }
    res.status(200).json(contact);
});

//desc: Create New Contact
//method: POST /api/contact
//access: Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(401);
        throw new Error("All fields are mandatort");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    // Clear cache after new contact is created
    const key = req.user.id;
    await redisClient.del(key);

    res.json(contact);
});

//desc: Update Contact by Id
//method: PUT /api/contact/Id
//access: Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id != req.user.id) {
        res.status(401);
        throw new Error("user doesnot have permission to access this contact");
    }
    const updatedcontact = await contactModel.findByIdAndUpdate(req.params.id, req.body);

    // Clear cache after contact update
    const key = req.user.id;
    await redisClient.del(key);

    res.status(200).json(updatedcontact);
});


//desc: Delete Contact by Id
//method: DELETE /api/contact/Id
//access: Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found');
    }
    if (contact.user_id != req.user.id) {
        res.status(401);
        throw new Error("user doesnot have permission to access this contact");
    }
    const deletecontact = await contactModel.findByIdAndDelete(req.params.id);

    // Clear cache after contact deletion
    const key = req.user.id;
    await redisClient.del(key);

    res.status(200).json(deletecontact);
});

//desc: Delete All contact
//method: DELETE /api/contact/
//access: Public
const deleteContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.deleteMany({ user_id: req.user.id });

    // Clear cache after deleting all contacts
    const key = req.user.id;
    await redisClient.del(key);

    res.status(200).json(contacts);
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact, deleteContacts }