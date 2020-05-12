const log4js = require("log4js");
log4js.configure({
  appenders: {
    cheese: { type: "console", filename: "cheese.log" },
    allLog: {
      type: "dateFile",
      filename: "./log/all.log",
      keepFileExt: true,
      maxLogSize: 10485760,
      backups: 3,
      pattern: "./yyyy-MM-dd",
    },
    out: { type: "console" },
  },

  categories: { default: { appenders: ["cheese", "allLog"], level: "debug" } },
});

const logger = log4js.getLogger("cheese");
const logger2 = log4js.getLogger("allLog");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");

logger2.trace("Entering cheese testing");
logger2.debug("Got cheese.");
logger2.info("Cheese is Comté.");
logger2.warn("Cheese is quite smelly.");
logger2.error("Cheese is too ripe!");
logger2.fatal("Cheese was breeding ground for listeria.");

