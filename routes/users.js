const express = require('express')
const router = express.Router()

const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: "root",
    password: "",
    database: "merchstore"
}

router.get('/:role', async (req, res) => {
    const { role } = req.params

    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM users WHERE role=?`
        const [rows] = await connection.query(sql, [role])
        if (rows.length === 0) {
            connection.end
            return res.status(400).json(`No users of role ${role} available.`)
        }
        connection.end
        return res.status(200).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router