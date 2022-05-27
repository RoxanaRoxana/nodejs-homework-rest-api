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
      // do we want the state of the document from before or after operation
      new: true,
      // we select if we want to run mongoose validators from schema
      runValidators: true,
      // throw errors when payload has field from outside of schema
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
