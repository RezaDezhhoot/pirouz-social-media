const winston = require('winston');
const appPath = require('app-root-path');
const options = {
    File:{
        level: "info",
        filename: `${appPath}/logs/app.log`,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5000000,
        maxFiles: 5,
    },
    Console:{
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize(),winston.format.simple())
    }
}
const logger = new winston.createLogger({
    transports:[
        new winston.transports.File(options.File),
        new winston.transports.Console(options.Console),
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    }
};

module.exports = logger;