const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser", // kawara
  password: "hyfpassword", //encrypted password
  database: "portfolio"
});

const execQuery = promisify(db.query.bind(db));

module.exports = execQuery;