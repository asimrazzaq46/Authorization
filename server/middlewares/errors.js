const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.message = err.message || "internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).send({
    success: false,
    error: err.stack,
  });
};
