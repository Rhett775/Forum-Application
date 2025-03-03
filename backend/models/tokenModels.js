const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        index: true
    }
}, {timestamps: true})

const Token = new mongoose.model("Token", tokenSchema)

module.exports = Token