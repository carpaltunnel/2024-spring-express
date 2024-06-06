import AuthCoordinator from '../coordinators/auth.coordinator.js';
import logger from '../lib/logger.js';
import bcrypt from 'bcryptjs';

const middleware = () => async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send();
    return;
  }

  /*
  const authValue = Buffer.from(req.headers.authorization, 'base64').toString('utf8');
  const values = authValue.split(':');
  const apiKey = values[0];
  const apiSecret = values[1];

  const dbKey = await ApiKeysCoordinator.getApiKey(apiKey, apiSecret);

  if (!dbKey) {
    logger.warn('API Key and/or secret not found!', {
      apiKey,
    });
    res.status(401).send();
    return;
  }
  */

  const authValue = Buffer.from(req.headers.authorization, 'base64').toString('utf8');
  const values = authValue.split(':');
  const username = values[0];
  const password = values[1];

  const valid = await AuthCoordinator.validateUserPass(username, password);

  if (!valid) {
    res.status(401).send();
    return;
  }

  next();
};

export default middleware;
