const express = require('express')
const router = express.Router()

const mysql = require('mysql2/promise')

const dbConfig = {
    host : 'localhost',
    user : "root",
    password : "",
    database : "merchstore"
}

router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = ``
        const [rows] = await connection.query(sql)
    } catch(error) {
        res.status(400).json(error)
    }
})


module.exports = router