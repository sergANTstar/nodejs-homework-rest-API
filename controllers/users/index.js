const signup = require('./signup')
const login = require('./login')
const logout = require('./logoute')
const getCurrent = require('./getCurrent')
const changeSubscription = require('./changeSubscription')
const setAvatar = require('./setAvatar')
const resendVerifyEmail = require('./resendVerifyEmail')
const verifyEmail = require('./verifyEmail')

module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    changeSubscription,
    setAvatar,
    verifyEmail,
    resendVerifyEmail,
}