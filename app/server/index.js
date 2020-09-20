"use strict";
const mysql = require("mysql");
const { promisify } = require("util");
const nodemailer = require("nodemailer");
const MysqlDatabaseProvider = require("./infrastructure/provider/mysql-database-provider");
const ProjectRepository = require("./infrastructure/repository/project-repository");
const ProjectResolver = require("./infrastructure/resolver/project-resolver");
const MailResolver = require("./infrastructure/resolver/mail-resolver");
const config = require("./config/config.json");

module.exports = (router) => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, NODEMAILER } = process.env;

  config.mysql.host = DB_HOST || config.mysql.host;
  config.mysql.port = DB_PORT || config.mysql.port;
  config.mysql.user = DB_USER || config.mysql.user;
  config.mysql.password = DB_PASS || config.mysql.password;
  config.nodemailer = NODEMAILER ? JSON.parse(NODEMAILER) : config.nodemailer;

  const mysqlProvider = new MysqlDatabaseProvider(mysql, promisify, config.mysql);
  const projectRepository = new ProjectRepository(mysqlProvider, config.projectRepository);
  const projectResolver = new ProjectResolver(router, projectRepository);
  const mailResolver = new MailResolver(router, nodemailer, config.nodemailer);

  projectResolver.resolve();
  mailResolver.resolve();

  router.use("*", (request, response) => response.status(404).end());
  return router;
};
