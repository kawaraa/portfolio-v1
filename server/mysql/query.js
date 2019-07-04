const execQuery = require("./connection.js");

class SQL {

  static insert(arrayOfValues) {
    return execQuery("REPLACE INTO project VALUE ?", [arrayOfValues]);
  }
  static query() {
    return execQuery("SELECT 1 + 1 AS solution");
  }

}

module.exports = SQL;