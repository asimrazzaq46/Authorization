const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Your Name"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide an Email"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Please provide the Password"],
    trim: true,
    select: false,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password Cannot contain the word PASSWORD");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 1) {
        throw new Error("age cannot be less than 1");
      }
      if (value < 18) {
        throw new Error("you should be 18 to create this account!");
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified) {
    next();
  }
  user.password = await bcrypt.hash(user.password, 10);

  next();
});

//comparing Pssswords

userSchema.methods.comparePasswords = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// creating Json web token

userSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ _id: this._id.toString() }, process.env.SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
