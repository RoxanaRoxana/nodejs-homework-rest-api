const Contact = require("./schemas/contact");

const getAllContacts = () => Contact.find({});

module.exports = {
    getAllContacts,
}