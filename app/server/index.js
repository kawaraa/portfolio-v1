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
  const NODEMAILER = process.env.NODEMAILER ? JSON.parse(process.env.NODEMAILER) : config.nodemailer;

  const mysqlProvider = new MysqlDatabaseProvider(mysql, promisify, config.mysql);
  const projectRepository = new ProjectRepository(mysqlProvider, config.projectRepository);
  const projectResolver = new ProjectResolver(router, projectRepository);
  const mailResolver = new MailResolver(router, nodemailer, NODEMAILER);

  projectResolver.resolve();
  mailResolver.resolve();

  router.use("*", (request, response) => response.status(404).end());
  return router;
};
