require("dotenv").config();

const express = require("express");
const logger = require("./server/utils/logger");
global.logger = logger;

/**
 * initialize DB
 */
require("./server/utils/db");

const app = express();

app.use("/category", require("./server/routes/category"));

app.use((err, req, res, next) => {
  console.error(err.stack, err.name);
  if (err.name == "APIError") {
    return res
      .status(err.trace.statusCode || 500)
      .json({ err: err.trace.description });
  } else if (err.name === "ValidationError") {
    err.statusCode = 400;
  }
  return res.status(err.statusCode || 500).json({ err: err.stack });
});

app.listen(process.env.APP_PORT, process.eventNames.APP_HOST);
