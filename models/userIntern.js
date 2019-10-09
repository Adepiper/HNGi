const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

const IUser = mongoose.model('IUser', UserSchema)

module.exports = IUser;