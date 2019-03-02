const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "kawara",
  password: "pass",
  database: "portfolio"
});

const execQuery = promisify(db.query.bind(db));

module.exports = execQuery;