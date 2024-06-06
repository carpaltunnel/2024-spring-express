import AuthModel from '../models/auth.js';
import bcrypt from 'bcryptjs';
import Constants from '../lib/constants.js';
import jwt from 'jsonwebtoken';


export default class AuthCoordinator {
  static getApiKey = (key, secret) => {
    return AuthModel.getApiKey(key, secret);
  };

  static validateUserPass = async (username, password) => {
    const mongoResult = await AuthModel.fetchPasswordHash(username);
    const passwordHash = mongoResult.password;
    return bcrypt.compare(password, passwordHash);
  };

  static generateJwt = async (requestBody) => {
    const valid = await AuthCoordinator
      .validateUserPass(requestBody.username, requestBody.password);

    if (valid) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        username: requestBody.username,
        magic: true,
      }, Constants.JWT_SECRET);

      return { token };
    }

    return null;
  };
}
