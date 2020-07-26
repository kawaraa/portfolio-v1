"use strict";
class MysqlDatabaseProvider {
  constructor(mysql, promisify, config) {
    this.mysql = mysql;
    this.promisify = promisify;
    this.config = config;
    this.initialize();
  }

  initialize() {
    this.config.host = process.env.MARIADB_SERVICE_HOST || this.config.host;
    this.config.port = process.env.MARIADB_SERVICE_PORT || this.config.port;
    this.config.user = process.env.MARIADB_USER || this.config.user;
    this.config.password = process.env.MARIADB_PASSWORD || this.config.password;
    this._connection = this.mysql.createConnection(this.config);
    this.query = this.promisify(this._connection.query.bind(this._connection));
  }
}

module.exports = MysqlDatabaseProvider;
