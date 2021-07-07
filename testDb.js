require('dotenv').config()

const db = require('./models')
db.connect() // test db connection

const dbTest = async () => {
    try {
        const newUser = new db.User({
            name: 'oliver cromwell',
            email: 'o@c.com',
            password: 'oliver'
        })

        await newUser.save()
        console.log('new user:', newUser)


        const foundUser = await db.User.findOne({
            name: 'oliver cromwell'
        })

        console.log('found user:', foundUser)

    } catch (err) {
        console.log(err)
    }
}

dbTest()