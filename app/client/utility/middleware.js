const cookie = require("cookie");
const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const countryCode = request.headers["cf-ipcountry"];
  const user = null;

  if (process.env.NODE_ENV !== "production") request.country = request.query.force || env.CODE;
  else request.country = countryCode || env.CODE;

  if (user) request.user = user;

  next();
};
