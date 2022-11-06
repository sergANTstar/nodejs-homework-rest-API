
const { Contact } = require("../../models/contacts");

const  createError  = require("../../helpers/createError");

const removeContact = async (req, res) => {
    const { id } = req.params;
    const reply = await Contact.findByIdAndRemove(id);
    if (!reply) {
        throw createError(404)
    }
    res.json({
        message: "Contact deleted"
    })
}

module.exports = removeContact; 