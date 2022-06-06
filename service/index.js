const Contact = require("./schemas/contact");
const {
  Types: { ObjectId },
} = require("mongoose");

const getAllContacts = () => Contact.find({}).lean();

const getContact = (contactId) => {
  let objectIdContactId;
  try {
    objectIdContactId = ObjectId(contactId);
  } catch (e) {
    return null;
  }
  return Contact.findOne({ _id: objectIdContactId }).lean();
};

const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });

const deleteContact = (contactId) => Contact.deleteOne({ _id: contactId });

const updateStatusContact = (contactId, contactToUpdate) =>
  Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    { $set: contactToUpdate },
    {
      new: true,

      runValidators: true,

      strict: "throw",
    }
  );

 
module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateStatusContact,
};
