const service = require("../service");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
};
