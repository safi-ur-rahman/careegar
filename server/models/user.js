const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    },
    completedProfile: {
        type: Boolean,
    }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;