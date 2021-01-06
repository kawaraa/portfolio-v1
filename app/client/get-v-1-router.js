"use strict";
const fs = require("fs");
const path = require("path");
const errorMessage = require("./layout/error.html");
const indexHtml = require("./layout/index.html");
const CustomError = require("./utility/custom-error");

const pages = [];

module.exports = (router) => {
  const dirNames = fs.readdirSync(path.join(__dirname + "/page"));

  const addPage = (pagePath) => {
    const page = {};
    page.render = require("./page/" + pagePath);
    page.path = /home.html/gim.test(pagePath) ? "/" : pagePath.replace(".html", "");
    pages.push(page);
  };

  const lookForPages = (folderPath) => {
    const dirNames = fs.readdirSync(path.join(__dirname + "/page/" + folderPath));
    dirNames.forEach((dirName) => {
      const filePath = path.join(__dirname + "/page/" + folderPath + dirName);
      if (fs.statSync(filePath).isDirectory()) lookForPages(folderPath + dirName);
      else lookForPages(folderPath + dirName);
    });
  };

  dirNames.forEach((dirName) => {
    const filePath = path.join(__dirname + "/page/" + dirName);
    if (fs.statSync(filePath).isDirectory()) lookForPages(dirName);
    else addPage("/" + dirName);
  });

  pages.forEach((page) => {
    router.get(page.path, async (req, res) => res.send(indexHtml(page.render(), req.user)));
  });

  router.use("*", (req, res) => res.status(500).end(indexHtml(errorMessage("Not found(!)"))));

  return router;
};
