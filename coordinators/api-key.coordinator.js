import ApiKeysModel from '../models/api-keys.model.js';

export default class ApiKeysCoordinator {
  static getApiKey = (key, secret) => {
    return ApiKeysModel.getApiKey(key, secret);
  };
}
