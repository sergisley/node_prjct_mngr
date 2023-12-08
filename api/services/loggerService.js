const winston = require('winston');

const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {  },
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { Logger };