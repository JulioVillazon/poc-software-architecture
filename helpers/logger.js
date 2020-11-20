'use strict'

// https://github.com/winstonjs/winston#usage
const winston = require('winston')

// TODO Change winston transport later other than Console for prod
const logger = winston.createLogger({
  level: 'debug',
  // defaultMeta: { service: 'novopayment' },
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false // do not exit on handled exceptions
})

logger.stream = {
  write (msg, encoding) {
    logger.info(msg)
  }
}

module.exports = logger
