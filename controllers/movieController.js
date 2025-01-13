const conn = require("../data/db")

function index(req, res) {
    console.log("Index")

    let sql = `SELECT * FROM movies`

    conn.query(sql, (err, movies) => {
        if (err)
            return res.status(500).json({
                message: err.message
            })

        movies.forEach((movie) => {
            movie.image = `http://localhost:3000/imgs/${movie.image}`
        })
        res.json(movies)
    })
}

function show(req, res) {
    console.log("Show")

    const id = req.params.id

    let sql = `SELECT * FROM movies WHERE id = ?`

    conn.query(sql, [id], (err, movies) => {
        if (err)
            return res.status(500).json({
                message: err.message
            })
        else if (res.length === 0)
            return res.status(404).json({
                error: "Not found",
                message: "Movie not found"
            })

        const movie = movies[0]

        movie.image = `http://localhost:3000/imgs/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        conn.query(sql, [id], (err, reviews) => {
            if (err)
                return res.status(500).json({
                    message: err.message
                })

            movie.reviews = reviews
            res.json(movie)
        })

    })
}

function storeReview(req, res) {
    console.log("Store Review")

    const id = req.params.id
    const { name, vote, text } = req.body

    //console.log(name, vote, text)

    if (!name || !vote || !text) {
        return res.status(400).json({
            message: "Name, vote, and text are required fields"
        })
    }

    const voteInt = parseInt(vote)

    const sql = `INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)`

    conn.query(sql, [name, voteInt, text, id], (err, result) => {
        if (err)
            return res.status(500).json({
                message: err.message
            })

        res.json({
            message: "Review inserted successfully"
        })
    })
}

module.exports = { index, show, storeReview }