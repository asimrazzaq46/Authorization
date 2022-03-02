const User = require("../models/users");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/JwtToken");
// Create User

exports.createUser = catchAsyncError(async (req, res) => {
  const user = new User(req.body);

  const token = await user.getJwtToken();
  await user.save(req.body);

  sendToken(user, 200, res);
});

// Get All Users

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new ErrorHandler("No users Found", 404));
  }
  res.send(user);
});

// Get Single user

exports.getOneUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(new ErrorHandler("No User is Found", 400));
  }
  res.send(user);
});

// Update User

exports.updateUser = catchAsyncError(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHandler("user not found"));
  }
  res.send(user);
});

exports.deleteUser = catchAsyncError(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  res.send({
    message: "user Deleted Succefully",
    user,
  });
});
