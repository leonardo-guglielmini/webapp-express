const express = require("express")
const cors = require("cors")
const app = express()
const movieRouter = require("./routers/movieRouter")
const port = process.env.PORT || 3000

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
)

app.get("/", (req, res) => {
    res.send("Server running")
})

app.use("/api/movies", movieRouter)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})