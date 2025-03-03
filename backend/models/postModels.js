const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
}, {timestamps: true})

const Post = new mongoose.model("Post", postSchema)

module.exports = Post