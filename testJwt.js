const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // User process:

        // create the data payload
        const payload = {
            name: 'erik',
            id: 5
        }

        // signing the jwt
        const token = jwt.sign(payload, 'This is my secret', { expiresIn: 60 * 24 })
        console.log(token)

        // request to server:

        // decode the incomign jwt
        const decoded = jwt.verify(token, 'This is my secret')
        console.log(decoded)

    } catch(err) {
        console.log(err)
    }
}

jwtTest()