const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must contain at least 3 characters'],
        maxLength: [20, 'Name can not be more than 20 characters'],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: "Password is not strong enough.",
        },
    },
    role: {
        type: String,
        default: 'candidate',
        enum: {
            values: ['candidate', 'hiring-manager', 'admin'],
            message: "User role can't be {VALUE}"
        }
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'blocked']
    },
    contactNumber: String,
    address: String
}, { timestamp: true })

// Hash Password_____________
userSchema.pre('save', function (next) {
    const hashedPass = bcrypt.hashSync(this.password, 10)
    this.password = hashedPass
    next()
})

// Compare hash Password_____________
userSchema.methods.compareHash = (pass, hashedPass) => {
    const isValidPassword = bcrypt.compareSync(pass, hashedPass)
    return isValidPassword
}

const User = mongoose.model('User', userSchema)
module.exports = User
