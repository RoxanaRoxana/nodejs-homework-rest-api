const service = require("../service");
const Contact = require("../service/schemas/contact");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json(contact);
    }
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.createContact({ name, email, phone });

    res.status(201).json({ message: "Contact was created", result });
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  await service.deleteContact(contactId);
  res.status(204).json();
};

const put = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToUpdate = req.body;
  try {
    const result = await service.updateStatusContact(
      contactId,
      contactToUpdate
    );
    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json({ message: "Contact was updated", contact: result });
    }
  } catch (e) {
    next(e);
  }
};

const patchIsFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  try {
    const result = await service.updateStatusContact(contactId, { favorite });
    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json({
        message: `Contact was patched to favorite ${favorite}`,
        contact: result,
      });
    }
  } catch (e) {
    next(e);
  }
};



module.exports = {
  get,
  getOne,
  post,
  deleteContact,
  put,
  patchIsFavorite,
};
