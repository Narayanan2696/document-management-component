const logger = require('../winston');

const infoLogger = (message) => {
  logger.info({ message });
};

const errorLogger = (message) => {
  logger.error({ message });
};

module.exports = {
  infoLogger,
  errorLogger,
};
