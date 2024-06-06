import AuthModel from '../models/auth.js';
import bcrypt from 'bcryptjs';

export default class AuthCoordinator {
  static getApiKey = (key, secret) => {
    return AuthModel.getApiKey(key, secret);
  };

  static validateUserPass = async (username, password) => {
    const mongoResult = await AuthModel.fetchPasswordHash(username);
    const passwordHash = mongoResult.password;
    return bcrypt.compare(password, passwordHash);
  };
}
