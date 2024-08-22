const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        user_id: {type:mongoose.Schema.ObjectId, require: true, ref:"user"},
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, trim: true },
        phone: { type: String, require: true, trim: true }
    },
    { timestamps: true }
)
const contactModel = mongoose.model("contacts", contactSchema);

module.exports = contactModel;