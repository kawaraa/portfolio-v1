"use strict"
const app = require("./server/server.js");

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  let state = err ? err.message : `Server listening on port ${PORT}...`;
  console.log(state);
});