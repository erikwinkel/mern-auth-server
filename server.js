require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
const db = require('./models')

db.connect()

// config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // for the request body
app.use((req,res,next) => {
    console.log(`incoming request: ${req.method} ${req.url}`)
    res.locals.anything = '🚀'
    next()
})

// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

const middleWare = (req,res,next) => {
    console.log('i am a route specific middleware!')
    next()
}

// routes
app.get('/', middleWare, (req,res) => {
    console.log(res.locals.anything)
    res.json({ msg: 'hello from the backend' })
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`🎧 listening on :${PORT}`)
})