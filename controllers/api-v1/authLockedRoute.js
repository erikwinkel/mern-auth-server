const jwt = require('jsonwebtoken')
const db = require('../../models')

const authLockedRoute = async (req,res,next) => {
    try {
        // get jwt from suth headers
        const authHeaders = req.headers.authorization
        // verify the jwt -- if invalid, throw
        const decoded = jwt.verify(authHeaders, process.env.JWT_SECRET)
        // find the user from db
        const foundUser = await db.User.findById(decoded.id)
        // mount the user on res.locals
        res.locals.user = foundUser
        next()
    } catch(err) {
        console.log(err)
        res.status(401).json({ msg: "you aren't allowed to be here"})
    }
}

module.exports = authLockedRoute