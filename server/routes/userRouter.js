const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");

const {
  getAllUser,
  createUser,
  updateUser,
  getOneUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/user").get(isAuthenticated, getAllUser);
router.route("/user/:id").get(isAuthenticated, getOneUser);
router.route("/user").post(createUser);
router.route("/user/:id").put(isAuthenticated, updateUser);
router.route("/user/:id").delete(isAuthenticated, deleteUser);

module.exports = router;
