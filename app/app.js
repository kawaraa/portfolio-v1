"use strict";
require("./config/load-config")();
const express = require("express");
const getApiRouter = require("./server/index");
const getWebRouter = require("./client/get-web-router");
// const englishBookView = require("./client/view/english-book.html");

(async () => {
  try {
    const app = express();
    const apiRouter = getApiRouter(express.Router());
    const webRouter = getWebRouter(express.Router());

    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(env.publicDir));
    app.use("/api", apiRouter);
    app.get("*", webRouter);

    // app.get("/english-book", (request, response) => {
    //   response.send(englishBookView(env.STRIPE.publicKey));
    // });

    app.use("*", (request, response) => response.status(404).end());

    app.listen(env.PORT, (err) => console.log(`App running on http://localhost:${env.PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
