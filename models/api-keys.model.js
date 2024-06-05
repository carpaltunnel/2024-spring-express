import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import logger from '../lib/logger.js';

export default class ApiKeysModel {
  static getApiKey = (key, secret) => {
    logger.debug('Retrieving API Key', {
      key,
    });
    return db.getDb().collection(Constants.AUTH_KEYS_COLLECTION).findOne({ key, secret });
  };
}
