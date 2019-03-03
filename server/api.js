"use strict"
const apiRouter = require("express").Router();
const SQL = require("./mysql/query");

apiRouter.route("/projects")
  .get((req, res) => {
    SQL.query().then(results => {
      res.json(results)
    }).catch(error => {
      res.status(404).json(error)
    });


  })
  .post((req, res) => {
    console.log(req.body)
    res.send("A new project is added");
  });

apiRouter.use("*", (req, res) => {
  res.status(404).end();
})

module.exports = apiRouter;