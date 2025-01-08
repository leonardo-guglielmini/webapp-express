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

    const id = req.params.id

    let sql = `SELECT * FROM movies WHERE id = ?`

    conn.query(sql, [id], (err, result) => {
        if (err)
            return res.status(500).json({
                message: err.message
            })
        else if (res.length === 0)
            return res.status(404).json({
                error: "Not found",
                message: "Movie not found"
            })

        const movie = result[0]

        let sql = `SELECT * FROM reviews WHERE movie_id = ?`

        conn.query(sql, [id], (err, result) => {
            if (err)
                return res.status(500).json({
                    message: err.message
                })
            movie.reviews = result
            res.json(movie)
        })

    })
}

module.exports = { index, show }