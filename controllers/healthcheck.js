import logger from '../lib/logger.js';

export const healthcheck = async (req, res, next) => {
  logger.info('healthcheck');

  res.status(200).send(new Date().toISOString());
};