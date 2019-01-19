const express = require("express");
const bodyParser = require("body-parser");

const logger = require("./server/utils/logger");
const neo4jSessionCleanup = require("./server/middlewares/neo4jSessionCleanup");
global.logger = logger;

const app = express();

app.use(bodyParser.json());
app.use(neo4jSessionCleanup);

app.use("/api", require("./server/routes/"));

app.use((err, req, res, next) => {
  global.logger.error(err.stack, err.name);
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
