import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthModel from '../models/auth.js';
import Constants from '../lib/constants.js';

export default class AuthCoordinator {
  static getApiKey = (key, secret) => {
    return AuthModel.getApiKey(key, secret);
  };

  static validateUserPass = async (username, password) => {
    const mongoResult = await AuthModel.fetchPasswordHash(username);

    if (!mongoResult) {
      return null;
    }

    const passwordHash = mongoResult.password;
    if (bcrypt.compareSync(password, passwordHash)) {
      return mongoResult;
    }

    return null;
  };

  static generateJwt = async (requestBody) => {
    const user = await AuthCoordinator
      .validateUserPass(requestBody.username, requestBody.password);
console.error(user);
    if (user) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        username: user.username,
        roles: user.roles,
      }, Constants.JWT_SECRET);

      return { token };
    }

    return null;
  };
}
