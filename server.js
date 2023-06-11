require('dotenv').config()

const express = require('express')
const cors = require('cors');
const cookieParser = require("cookie-parser")
const path = require('path')
const { StatusCodes } = require('http-status-codes')

// port
const PORT = process.env.PORT || 7000

// reference
const app = express()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware
app.use(cookieParser())
app.use(cors())

// route modules
const todoRoute = require('./route/todoRoute')

// primary route
app.use('/todo', todoRoute)

//static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.all('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "The Request route path not found" })
})

const start = async () => {
    app.listen(PORT, () => {
        console.log(`server is listening @ http://localhost:${PORT}`);
    })
}

start()


