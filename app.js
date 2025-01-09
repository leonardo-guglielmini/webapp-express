const express = require("express")
const cors = require("cors")
const app = express()
const movieRouter = require("./routers/movieRouter")
const port = process.env.PORT || 3000

const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors({ origin: process.env.CORS_ORIGIN }))

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send("Server running")
})

app.use("/api/movies", movieRouter)

app.use(errorHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})