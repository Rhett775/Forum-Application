const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('./models/postModels')
const User = require('./models/userModels')
const Token = require('./models/tokenModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//get posts
router.get('/posts', authenticate, async (req, res, next) => {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
})

//create post
router.post('/posts', authenticate, async (req, res, next) => {
    const {title, content, author} = req.body
    const newPost = new Post({title, content, author})
    await newPost.save()
    res.status(201).json({message: "Post created"})
})

//delete post
router.delete('/posts/:id', authenticate, async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Error: no such post")

    const post = await Post.findById(id)

    if(!post)
        return res.status(404).send("Error: no such post")
    
    await Post.deleteOne({_id: id})
    res.status(200).json(post)
})

//update post
router.patch('/posts/:id', authenticate, async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Error: no such post")

    const {title, content, author} = req.body

    const updatedPost = await Post.findOneAndUpdate({_id: id}, {title, content, author})

    if(!updatedPost)
        return res.status(404).send("Error: no such post")

    res.status(200).json(updatedPost)
})

//register
router.post('/register', async (req, res, next) => {
    const {username, password, email} = req.body

    const userWithName = await User.findOne({username: username})
    const userWithEmail = await User.findOne({email: email})

    if (userWithName || userWithEmail)
        return res.status(400).json({error: "User already exists"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({username, hashedPassword, email})
    newUser.save()

    const refreshToken = jwt.sign({username: username}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})
    await Token.create({token: refreshToken})
    const accessToken = jwt.sign({username: username}, process.env.JWT_ACCESS_SECRET_KEY,{expiresIn: '5m'})

    res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({accessToken: accessToken})
})

//login
router.post('/login', async (req, res, next) => {
    const {username, password} = req.body

    const user = await User.findOne({username: username})

    if (!user)
        return res.status(400).json({error: "No such user"})

    const match = await bcrypt.compare(password, user.hashedPassword)

    if (!match)
        return res.status(400).json({error: "Incorrect Password"})

    const refreshToken = jwt.sign({username: username}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})
    await Token.create({token: refreshToken})
    const accessToken = jwt.sign({username: username}, process.env.JWT_ACCESS_SECRET_KEY,{expiresIn: '5m'})

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({accessToken: accessToken})
    
})

//refresh token
router.post('/refresh', async (req, res, next) => {
    const token = req.cookies.refreshToken
    const refreshToken = await Token.find({token: token})

    if (!refreshToken)
        return res.sendStatus(403)

    jwt.verify(refreshToken[0].token, process.env.JWT_REFRESH_SECRET_KEY, (error, email) => {
        if (error)
            return res.send(403)
        const accessToken = jwt.sign({username: username}, process.env.JWT_ACCESS_SECRET_KEY,{expiresIn: '5m'})
        res.json({accessToken: accessToken})
    })
})

//logout
router.post('/logout', async (req, res, next) => {
    const token = req.cookies.refreshToken
    await Token.deleteOne({token: token})
    res.sendStatus(204)
})

function authenticate(req, res, next) {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    if(!token)
        return res.status(401).send("No token")
    
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (error, user) => {
        if (error)
            return res.sendStatus(403)
        next()
    })

}

module.exports = router




