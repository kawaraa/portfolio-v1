module.exports = () => {
  const config = require("./config.json");
  let variable = process.env;
  if (process.env.NODE_ENV !== "production") variable = require("./variable.json");

  const parse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  };

  for (let key in variable) config[key] = parse(variable[key]);
  config.publicDir = process.cwd() + config.publicDir;

  global.env = config;
};
