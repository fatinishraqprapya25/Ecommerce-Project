const { Router } = require("express");
const userController = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./user.validations");

const userRoute = Router();

userRoute.post("/register", validateRequest(userValidations.userRegistrationValidationSchema), userController.register);
userRoute.post("/login")

module.exports = userRoute;