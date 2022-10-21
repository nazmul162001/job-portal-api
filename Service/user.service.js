const User = require("../Model/User")
const Candidate = require("../Model/Candidate")
const HiringManager = require("../Model/HiringManager")

exports.userExist = async (email) => {
    const result = await User.findOne({ email })
    return result
}

exports.findUserByEmail = async (email) => {
    const result = await User.findOne({ email })
    return result
}

exports.signUpService = async (userInfo) => {

    const user = await User.create(userInfo)

    if (userInfo.role === 'hiring-manager') {
        await HiringManager.create({ name: user.name, user: user._id })
    } else if (userInfo.role === 'admin') {
        console.log('Do nothing')
    } else {
        await Candidate.create({ name: user.name, user: user._id, role: 'candidate' })
    }

    return user
}

exports.signInService = async (email) => {
    const result = await User.findOne({ email })
    return result
}
