const execQuery = require("./connection.js");

class SQL {

  static insert(arrayOfValues) {
    return execQuery("REPLACE INTO project VALUE ?", [arrayOfValues]);
  }
  static query() { }

}

module.exports = SQL;