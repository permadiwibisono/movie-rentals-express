const debug = require('debug')('app:middleware');

const loggerMiddleware = (req, res, next) => {
  debug("Logging....");
  next();
}

module.exports = loggerMiddleware;