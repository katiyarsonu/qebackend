const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({ message, error: err.name });
  };
  
  module.exports = errorHandler;
  