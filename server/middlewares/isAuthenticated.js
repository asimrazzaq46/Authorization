const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ErrorHandler = require("../utils/errorHandler");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login!", 404));
  }

  const decoded = jwt.verify(token, process.env.SECRETKEY);

  req.user = await User.findById(decoded._id);

  next();
};

module.exports = isAuthenticated;
