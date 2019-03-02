"use strict"
const path = require("path");
const appDIR = path.join(__dirname, "../").toString();
const express = require("express");
const bodyParser = require("body-parser");
// const apiRouter = require("./api.js");
const sendEmail = require("./mailer.js");

const app = express();

app.use(express.static(appDIR + "client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(appDIR + "client/public/index.html");
});
app.post("/contact", (req, res) => {
  sendEmail(req.body, (err, info) => {
    // let result = err ? err : "Message is sent: " + info.messageId;
    if (err) return res.status(500).end();
    res.send("Thanks for contacting me!<br />I will contact you back very soon.");
  });
});

app.use("*", (req, res) => {
  res.status(404).end();
});

module.exports = app;

