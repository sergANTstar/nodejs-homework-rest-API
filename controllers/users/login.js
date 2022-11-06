const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {User,  schemas } = require('../../models/users')

const createError = require('../../helpers/createError')
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const {error} = schemas.login.validate(req.body)

    if(error) {
        throw createError(400, error.message)
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if (!user) {
        throw createError(401, 'Email wrong')
      }

    if (!user.verify) {
        throw createError(401, 'Email not verify')
      }

    const comparePassword = await bcrypt.compare(password, user.password)

    if(!comparePassword) {
        throw createError(401, 'Password wrong')
    }

    const playload = {id: user._id}

    const token = jwt.sign(playload, SECRET_KEY, {expiresIn: "24h"})
    
    await User.findByIdAndUpdate(user._id, {token})
    
    const {subscription} = user
   
    res.json({token, user: {email, subscription,},})

}

module.exports = login