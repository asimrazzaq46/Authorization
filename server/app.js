const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const errorMiddleWare = require("./middlewares/errors");

// import auth routes
const userRoutes = require("./routes/userRouter");
const authRoutes = require("./routes/authRouter");

const app = express();

dotenv.config({ path: "server/config/config.env" });

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//routes
app.use(userRoutes);
app.use(authRoutes);

app.use(errorMiddleWare);

module.exports = app;
