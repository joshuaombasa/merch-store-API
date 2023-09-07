const express = require('express')
const router = express.Router()
const { check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')

const dbConfig = {
    host : 'localhost',
    user : "root",
    password : "",
    database : "merchstore"
}

router.get('/', [
    check("email", "Invalid email address").isEmail,
    check("password", "Password must be at least 7 characters long").isLength({min : 7})
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
    }
    const {email, password} = req.body
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = ``
        const [rows] = await connection.query(sql)
    } catch(error) {
        res.status(400).json(error)
    }
})


module.exports = router