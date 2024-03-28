const middleware = () => (err, req, res, next) => {
  console.error(`ERROR : The following error occurred : ${err}`);

  let error;
  let responseCode = 500;

  // IF this is a validation error
  if (Array.isArray(err) && err.length > 0) {
    error = err;
    responseCode = 400;
  } else {
    error = 'Something went horribly wrong';
  }

  // Correct HTTP status

  // TODO: Send response to client.
  res.status(responseCode).json({
    error,
  });
};

export default middleware;
