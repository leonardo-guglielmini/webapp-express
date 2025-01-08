const conn = require("../data/db")

function index(req, res) {
    console.log("Index")
}

function show(req, res) {
    console.log("Show")
}

module.exports = { index, show }