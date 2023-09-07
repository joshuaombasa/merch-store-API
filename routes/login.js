const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


const mysql = require('mysql2/promise')

const dbConfig = {
    host : 'localhost',
    user : "root",
    password : "",
    database : "merchstore"
}

const SECRET_KEY = 'HVH9RUWRTBW4526Y42HWM'

router.get('/', [
    check("email", "Invalid email address").isEmail(),
    check("password", "Password must be at least 7 characters long").isLength({min : 7})
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
    }

    const {email, password} = req.body

    try {
        const connection = await  mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM users WHERE email=?`
        const [rows] = await connection.query(sql, [email])

        if (rows.length === 0) {
            connection.end()
            res.status(400).json("User does not exist")
        }

        const hashedPassword = rows[0].password
        const isMatch = await bcrypt.compare(hashedPassword, password)
        
        if (isMatch === false) {
            connection.end()
            return res.status(400).json("Invalid credentials")
        }

       const token = await JWT.sign({userId: rows[0].rows[0].password}, SECRET_KEY, {expiresIn  : '1h'})

       res.status(200).json({message : "Login successful", token : token})


    } catch(error) {
        res.status(400).json(error)
    }
})


module.exports = router