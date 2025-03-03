const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        require: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
}, {timestamps: true})

const User = new mongoose.model("User", userSchema)

module.exports = User