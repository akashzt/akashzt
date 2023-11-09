const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const Auth = require("../middlewares/authorization");



// create a new user
router.post("/user", controller.createUser);
// update details for an existing user, it does not allow updating the password
router.put("/user",Auth, controller.updateUser);
// login user using email and password
router.post("/user/login", controller.loginUser);
// change user password, you have to pass oldPassword and new password and a jwt in header for auth
router.put("/user/change-password",Auth, controller.changePassword);
// get user details/profile
router.get("/user/profile",Auth, controller.getUserProfile);

module.exports = router;
