const validApiKey = 'my-api-key';
const validApiSecret = 'my-secret';
// TODO: Expiration dates (ttl)

const middleware = () => (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send();
    return;
  }

  const authValue = Buffer.from(req.headers.authorization, 'base64').toString('utf8');
  const values = authValue.split(':');
  const apiKey = values[0];
  const apiSecret = values[1];

  if (apiKey !== validApiKey || apiSecret !== validApiSecret) {
    res.status(401).send();
    return;
  }

  next();
};

export default middleware;
