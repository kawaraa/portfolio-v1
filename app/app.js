"use strict";
const express = require("express");
const getApiRouter = require("./server/index.js");

(async () => {
  try {
    const app = express();
    const apiRouter = getApiRouter(express.Router());
    const publicDir = process.cwd() + "/client/public";
    const PORT = process.env.PORT || 8080;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(publicDir));
    app.use("/api", apiRouter);

    app.get("*", (request, response) => response.sendFile(publicDir + "/index.html"));

    app.use("*", (request, response) => response.status(404).end());

    app.listen(PORT, (err) => console.log(`App running on http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
