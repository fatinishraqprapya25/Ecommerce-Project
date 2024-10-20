const { Router } = require("express");
const userController = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./user.validations");
const userMiddlewares = require("./user.middlewares");
const checkLogin = require("../../middlewares/checkLogin");

const authRoute = Router();

authRoute.post("/register", userMiddlewares.uploader, validateRequest(userValidations.userRegistrationValidationSchema, userMiddlewares.deteteUploadedPhotoIfValidationFailed), userController.register);

authRoute.post("/login", validateRequest(userValidations.loginValidationSchema), userController.login);

const userRoute = Router();

userRoute.patch("/", checkLogin, validateRequest(userValidations.updateUserValidationSchema), userController.updateUserInfo);

module.exports = { authRoute, userRoute };