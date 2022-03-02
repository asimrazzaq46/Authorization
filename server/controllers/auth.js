const { findOne } = require("../models/users");
const User = require("../models/users");
const sendToken = require("../utils/JwtToken");
const ErrorHandler = require("../utils/errorHandler");

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Provide Email and Password!", 400));
  }

  // Finding user by there email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Email or Password is incorrect", 404));
  }

  //comparing Password ===> userSchema.comparePasswords in user models
  const matchedPasword = await user.comparePasswords(password);

  if (!matchedPasword) {
    return next(new ErrorHandler("Email or Password is incorrect", 404));
  }

  sendToken(user, 200, res);
};

//Log Out User

exports.logutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send("LogOut Succesfully");
};
