const fs = require("fs");
const winston = require("winston");
const moment = require("moment");

/**
 * Create access log stream.
 **/
const accessLogStream = fs.createWriteStream(
  `${process.env.LOG_FOLDER}/access.log`,
  {
    flags: "a"
  }
);

/** Initialize access log writer.
 **/
module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      timestamp: () => {
        return moment(new Date())
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss");
      },
      formatter: options => {
        return (
          options.timestamp() +
          " " +
          options.level.toUpperCase() +
          " " +
          (undefined !== options.message ? options.message : "") +
          (options.meta && Object.keys(options.meta).length
            ? "\n\t" + JSON.stringify(options.meta)
            : "")
        );
      },
      level: "verbose",
      colorize: true,
      name: "access-file",
      stream: accessLogStream,
      handleExceptions: false,
      humanReadableUnhandledException: false,
      json: false
    }),
    new winston.transports.Console()
  ],
  exitOnError: false
});
