// require mongoose
const mongoose = require('mongoose')

// connection function
const connect = () => {
    const MONGODB_URI = process.env.MONGODB_URI
    
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log(`MongoDB connection at ${db.host}:${db.port}`)
    })

    db.on('error', (err) => {
        console.log(`Error from db: \n ${err}`)
    })
}

// export connection function and models
module.exports = {
    connect,
    User: mongoose.model('user', require('./User.js'))
}