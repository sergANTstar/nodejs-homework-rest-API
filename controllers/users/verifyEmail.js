const {User} = require('../../models/users')

const createError = require('../../helpers/createError')

const verifyEmail = async(req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user) {
        throw createError(404);
    }
    await User.findByIdAndUpdate(user._id, {verificationToken: "", verify: true});
    res.json({
        message: 'Verification successful'
    });
}

module.exports = verifyEmail;