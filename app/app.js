"use strict";
require("./config/load-config")();
const express = require("express");
const getApiRouter = require("./server/index.js");
const donateView = require("./client/view/donate.html");

(async () => {
  try {
    const app = express();
    const apiRouter = getApiRouter(express.Router());

    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(env.publicDir));
    app.use("/api", apiRouter);

    app.get("/donate", (request, response) => {
      response.send(donateView(env.stripe.publicKey));
    });

    app.get("*", (request, response) => response.sendFile(env.publicDir + "/index.html"));

    app.use("*", (request, response) => response.status(404).end());

    app.listen(env.PORT, (err) => console.log(`App running on http://localhost:${env.PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
