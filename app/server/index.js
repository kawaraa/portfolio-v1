"use strict";
const mysql = require("mysql");
const { promisify } = require("util");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(env.STRIPE.secretKey);
const MysqlDatabaseProvider = require("./infrastructure/provider/mysql-database-provider");
const ProjectRepository = require("./infrastructure/repository/project-repository");
const ProjectResolver = require("./infrastructure/resolver/project-resolver");
const MailResolver = require("./infrastructure/resolver/mail-resolver");
const AddMemberResolver = require("./infrastructure/resolver/add-member-resolver");
const CheckoutResolver = require("./infrastructure/resolver/checkout-resolver");

module.exports = (router) => {
  const mysqlProvider = new MysqlDatabaseProvider(mysql, promisify);
  const projectRepository = new ProjectRepository(mysqlProvider);
  const projectResolver = new ProjectResolver(router, projectRepository);
  const mailResolver = new MailResolver(router, nodemailer);
  const addMemberResolver = new AddMemberResolver(router, nodemailer);
  const checkoutResolver = new CheckoutResolver(router, stripe);

  projectResolver.resolve();
  mailResolver.resolve();
  addMemberResolver.resolve();
  checkoutResolver.resolve();

  router.use("*", (request, response) => response.status(404).end());
  return router;
};
