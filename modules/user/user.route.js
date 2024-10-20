const { Router } = require("express");
const userController = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./user.validations");
const userMiddlewares = require("./user.middlewares");

const userRoute = Router();

userRoute.post("/register", userMiddlewares.uploader, validateRequest(userValidations.userRegistrationValidationSchema), userController.register);
userRoute.post("/login", validateRequest(userValidations.loginValidationSchema), userController.login);

module.exports = userRoute;