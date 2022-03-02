const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const sendToken = async (user, statusCode, res) => {
  //getting the token
  const token = await user.getJwtToken();

  // creating options for cookies

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send JWT TOken In Cookies

  res.status(statusCode).cookie("token", token, options).json({
    user,
    token,
  });
};

module.exports = sendToken;
