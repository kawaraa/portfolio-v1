"use strict";
const app = require("./server/server.js");

const PORT = process.env.PORT || 8080;
app.listen(PORT, err => {
  let state = err ? err.message : `App running on http://localhost:${PORT}`;
  console.log(state);
});
