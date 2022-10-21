const service = require('../Service/user.service')
const { generateToken } = require('../Utils/token')

exports.signUp = async (req, res) => {
    const userInfo = req.body
    try {

        const userExist = await service.userExist(userInfo.email)
        if (userExist) {
            return res.status(400).json({ status: 'Failed', error: "User already Exist with the same email" })
        }

        const user = await service.signUpService(userInfo)
        res.status(400).json({ status: 'Failed', message: "User signed up successfully", data: user })

    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.singIn = async (req, res) => {

    const { email, password } = req.body

    if (!email | !password) {
        return res.status(401).json({
            status: "fail",
            error: "Please provide email and password",
        });
    }

    try {
        const user = await service.signInService(email)
        if (!user) {
            return res.status(400).json({ status: 'Failed', error: 'User not found!' })
        }

        if (!user.status === 'active') {
            return res.status(401).json({
                status: "fail",
                error: "User account isn't active. Please contact support.",
            });
        }

        const correctPass = user.compareHash(password, user.password)
        if (!correctPass) {
            return res.status(400).json({ status: 'Failed', error: 'User credentials is wrong' })
        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            message: "User signed up successfully",
            data: { user, token }
        });

    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.me = async (req, res) => {

    try {

        const user = await service.findUserByEmail(req.user?.email)
        if (!user) {
            return res.status(200).json({ status: 'Failed', error: "User not found!" })
        }

        res.status(200).json({ status: 'Success', message: "User Verified", data: user })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}