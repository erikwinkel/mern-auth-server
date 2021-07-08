const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// GET /users -- test api endpoint
router.get('/', (req,res) => {
    res.json({ msg: 'hello. the user endpoint is ok ✔'})
})

// POST /users/register -- CREATE a new user (registration)
router.post('/register', async (req,res) => {
    try {
        // check if user exists already
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        // if the user is found -- don't let them register
        if(findUser) return res.status(400).json({ msg: 'user already exists in the db'})

        // hash password from req.body
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()

        // create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        // sign the jwt and send response
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 48 })

        res.json({ token })

    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: 'internal server error' })
    }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req,res) => {
    try {
        // try to find the user in the database
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        const validationFailedMessage = 'incorrect username or password'

        // if user not found, return immediately
        if(!findUser) return res.status(400).json({ msg: validationFailedMessage })

        // check the user's password against req.body
        const matchPassword = await bcrypt.compare(req.body.password, findUser.password)

        // if password doesn't match, return immediately
        if(!matchPassword) return res.status(400).json({msg: validationFailedMessage })

        // create the jwt payload
        const payload = {
            name: findUser.name,
            email: findUser.email,
            id: findUser.id
        }

        // sing the jwt and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 48 })
        res.json({ token })

    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: 'internal server error' })
    }
})

// GET /auth-locked -- will redirect if a bad jwt is found
router.get('/auth-locked', authLockedRoute, (req,res) => {
    // do whatever we like
    console.log(res.locals.user)
    // send private data back
    res.json({msg: 'welcome to the auth locked route'})
})

module.exports = router