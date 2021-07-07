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

// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

// routes
app.get('/', (req,res) => {
    res.json({ msg: 'hello from the backend' })
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`🎧 listening on :${PORT}`)
})