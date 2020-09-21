"use strict";
const getConfig = require("./server/config/get-config");
const express = require("express");
const getApiRouter = require("./server/index.js");

(async () => {
  try {
    const config = getConfig();
    const app = express();
    const apiRouter = getApiRouter(express.Router(), config);

    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(config.publicDir));
    app.use("/api", apiRouter);

    app.get("*", (request, response) => response.sendFile(config.publicDir + "/index.html"));

    app.use("*", (request, response) => response.status(404).end());

    app.listen(config.port, (err) => console.log(`App running on http://localhost:${config.port}`));
  } catch (error) {
    console.error(error);
  }
})();
