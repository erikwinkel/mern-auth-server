const bcrypt = require('bcryptjs')

const cryptoTest = async () => {
    try {
        // test password
        const password = 'hello'
    
        // specify the salt rounds
        const salt = 12
    
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)

        const match = await bcrypt.compare('hello', hashedPassword)
        console.log('match:',match)
    } catch(err) {
        console.log(err)
    }
}

cryptoTest()