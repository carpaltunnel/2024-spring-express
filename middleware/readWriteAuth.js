import jwt from 'jsonwebtoken';
import Constants from '../lib/constants.js';

const middleware = () => async (req, res, next) => {
  const token = req.headers.authorization;
  let decodedToken = false;

  try {
    decodedToken = jwt.verify(token, Constants.JWT_SECRET);

    if (!decodedToken.roles?.includes(Constants.READ_WRITE_ROLE)) {
      res.status(401).send();
      return;
    }
  } catch (ex) {
    decodedToken = false;
  }

  next();
};

export default middleware;
