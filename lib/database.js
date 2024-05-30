import { MongoClient } from 'mongodb';
import Constants from './constants.js';

class Database {
  _instance = null;
  client = null;

  // config has all DB settings
  init = async (config) => {
    this.client = new MongoClient(config.url, {
      minPoolSize: config.minPoolSize,
      maxPoolSize: config.maxPoolSize,
    });
    await this.client.connect();
    // eslint-disable-next-line no-underscore-dangle
    this._instance = this.client.db(config.database);
  };

  getDb = () => {
    return this._instance;
  };

  dbWidgets = () => {
    return this._instance.collection(Constants.WIDGETS_COLLECTION);
  };

  disconnect = async () => {
    return this.client.close();
  };
}

export const db = new Database();
