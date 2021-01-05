const indexHtml = require("../layout/index.html");
const errorMessage = require("../layout/error.html");
const CustomError = require("./custom-error");

module.exports = (response, error) => {
  response.status(500).end(indexHtml(errorMessage(CustomError.validate(error).message)));
};
