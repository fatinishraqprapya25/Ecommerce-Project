const { Router } = require("express");
const userController = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./user.validations");
const upload = require("../../utils/upload");

const userRoute = Router();

userRoute.post("/register", upload("profiles").single("avatar"), validateRequest(userValidations.userRegistrationValidationSchema), userController.register);
userRoute.post("/login", validateRequest(userValidations.loginValidationSchema), userController.login);

module.exports = userRoute;