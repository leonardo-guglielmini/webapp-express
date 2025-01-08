const conn = require("../data/db")

function index(req, res) {
    console.log("Index")

    let sql = `SELECT * FROM movies`

    conn.query(sql, (err, movies) => {
        if (err)
            return res.status(500).json({
                message: err.message
            })

        res.json(movies)
    })
}

function show(req, res) {
    console.log("Show")
}

module.exports = { index, show }