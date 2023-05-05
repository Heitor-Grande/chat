//sqlite3
const sqlite3 = require("sqlite3")
const database = new sqlite3.Database("./models/ms.db")

module.exports = database