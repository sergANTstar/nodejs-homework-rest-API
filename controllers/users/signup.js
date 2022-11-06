const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4 } = require("uuid");

const{User, schemas} = require("../../models/users")
const createError = require('../../helpers/createError')
const sendEmail = require('../../helpers/sendEmail')


const signup = async(req, res) => {
    const {error} = schemas.signup.validate(req.body)

    if(error) {
        throw createError(400, error.message)
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user) {
        throw createError(409, `Email ${email} in use`)
    }

    

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = v4()

    const reply = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken })
  
    const sgMail = {
    to: email,
    subject: 'Thank you for registration',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm registration</a>`,
  }

  await sendEmail(sgMail)
  res.status(201).json({
    email: reply.email,
    })
}

module.exports = signup;