import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import logger from '../lib/logger.js';

export default class AuthModel {
  static getApiKey = (key, secret) => {
    logger.debug('Retrieving API Key', {
      key,
    });
    return db.getDb().collection(Constants.AUTH_KEYS_COLLECTION).findOne({ key, secret });
  };

  static validateUserPass = (username, password) => {
    logger.debug('Querying username/password', {
      username,
    });
    return db.getDb().collection(Constants.USERS_COLLECTION).findOne({ username, password });
  };

  static fetchPasswordHash = (username) => {
    logger.debug('Querying password hash', {
      username,
    });

    return db.getDb().collection(Constants.USERS_COLLECTION).findOne(
      { username },
    );
  };
}
