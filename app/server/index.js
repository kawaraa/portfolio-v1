"use strict";
const mysql = require("mysql");
const { promisify } = require("util");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(env.stripe.secretKey);
const MysqlDatabaseProvider = require("./infrastructure/provider/mysql-database-provider");
const ProjectRepository = require("./infrastructure/repository/project-repository");
const ProjectResolver = require("./infrastructure/resolver/project-resolver");
const MailResolver = require("./infrastructure/resolver/mail-resolver");
const DonateResolver = require("./infrastructure/resolver/donate-resolver");

module.exports = (router) => {
  const mysqlProvider = new MysqlDatabaseProvider(mysql, promisify);
  const projectRepository = new ProjectRepository(mysqlProvider);
  const projectResolver = new ProjectResolver(router, projectRepository);
  const mailResolver = new MailResolver(router, nodemailer);
  const donateResolver = new DonateResolver(router, stripe);

  projectResolver.resolve();
  mailResolver.resolve();
  donateResolver.resolve();

  router.use("*", (request, response) => response.status(404).end());
  return router;
};
