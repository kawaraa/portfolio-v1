"use strict"
const apiRouter = require("express").Router();
const SQL = require("./mysql/query");

apiRouter.route("/projects")
  .get((req, res) => {
    res.send("projects")
  })
  .post((req, res) => {
    console.log(req.body)
    res.send("A new project is added");
  });