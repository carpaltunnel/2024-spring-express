import { MongoClient } from 'mongodb';

class Database {
  _instance = null;

  // config has all DB settings
  // TODO: Add connection pool
  init = async (config) => {
    const client = new MongoClient(config.url);
    await client.connect();
    // eslint-disable-next-line no-underscore-dangle
    this._instance = client.db(config.database);
  };

  getDb = () => {
    return this._instance;
  };
}

export const db = new Database();
