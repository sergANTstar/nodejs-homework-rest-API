const {User, schmas} = require('../../models/users')

const createError = require('../../helpers/createError')
const sendEmail = require('../../helpers/sendEmail')

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const {error} = schmas.email.validate({email});
    if(error){
        throw createError(400, error.message);
    }
    const user = await User.findOne({email});
    if(!user) {
        throw createError(404);
    }
    if(user.verify) {
        throw createError(400, "Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Site registration confirmation",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click to confirm registration</a>`
    }
    await sendEmail(mail);
    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;