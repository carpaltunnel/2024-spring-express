import jwt from 'jsonwebtoken';
import Constants from '../lib/constants.js';

const middleware = () => async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send();
    return;
  }

  /*
  // API Key/Secret Validation (basic)
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

  /*
  // Username/Password authentication (basic)
  const authValue = Buffer.from(req.headers.authorization, 'base64').toString('utf8');
  const values = authValue.split(':');
  const username = values[0];
  const password = values[1];

  const valid = await AuthCoordinator.validateUserPass(username, password);
  */

  // TODO: Support both UN/PW and API key/secret auth
  
  const token = req.headers.authorization;
  let valid = false;
  
  try {
    valid = jwt.verify(token, Constants.JWT_SECRET);
  } catch (ex) {
    valid = false;
  }

  if (!valid) {
    res.status(401).send();
    return;
  }

  next();
};

export default middleware;
