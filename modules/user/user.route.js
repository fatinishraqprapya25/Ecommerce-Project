const { Router } = require("express");
const userController = require("./user.controller");
const userRoute = Router();

userRoute.post("auth/register", userController.createUser);

module.exports = userRoute;