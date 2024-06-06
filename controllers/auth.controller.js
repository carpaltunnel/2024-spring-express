import logger from '../lib/logger.js';
import AuthCoordinator from '../coordinators/auth.coordinator.js';

// TODO: Support both UN/PW and API key/secret auth
// TODO: Support both UN/PW and API key/secret auth
// TODO: Support both UN/PW and API key/secret auth
export const generateJwt = async (req, res, next) => {
  logger.info('Calling auth.controller.getJWT', {
    location: 'controller',
    function: 'getJwt',
    method: 'POST',
  });

  try {
    const token = await AuthCoordinator.generateJwt(req.body);

    if (token) {
      res.status(200).json(token);
      return;
    } 
    
    res.status(401).send();
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};