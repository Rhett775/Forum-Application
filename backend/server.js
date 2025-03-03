require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database")
    })
    .catch((error) => {
        console.log("Error connecting to database")
    })

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use('/api/forum', router)

app.listen(process.env.PORT, (error) => {
    if (!error)
        console.log("Listening on port ", process.env.PORT)
    else
        console.log("Error can't start server")
})
