const middleware = () => (err, req, res, next) => {
  console.error(`ERROR : The following error occurred : ${err}`);
  
  // TODO: Send response to client.
  res.status(500).json({
    error: true,
    errorMessage: 'Something went horribly wrong',
  });
};

export default middleware;
