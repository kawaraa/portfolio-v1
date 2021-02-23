"use strict";
require("./config/load-config")();
const express = require("express");
const getApiRouter = require("./server/index");
const getV1Router = require("./client/get-v-1-router");
const englishBookView = require("./client/page/english-book.html");

(async () => {
  try {
    const app = express();
    const apiRouter = getApiRouter(express.Router());
    const webRouter = getV1Router(express.Router());

    app.use(async (req, res, next) => {
      try {
        req.country = null;
        const url = `https://get.geojs.io/v1/ip/country/${request.headers["x-forwarded-for"]}.json`;
        const res = await this.fetch(url).then((res) => res.json());
        console.log("<<< Country >>>", res);
        if (res && res.country) req.country = res.country;
        next();
      } catch (error) {
        console.log("<<< Country - Error >>>", res);
        next();
      }
    });
    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(env.publicDir));
    app.use("/api", apiRouter);
    app.use("/v-1", webRouter);

    app.get("/english-book", (request, response) => {
      response.send(englishBookView(env.STRIPE.publicKey));
    });

    app.use("*", (request, response) => response.status(404).end("Not found(!)"));

    app.listen(env.PORT, (err) => console.log(`App running on http://localhost:${env.PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
