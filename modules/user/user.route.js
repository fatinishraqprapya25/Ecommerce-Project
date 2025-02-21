const { Router } = require("express");
const userController = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./user.validations");
const userMiddlewares = require("./user.middlewares");
const checkLogin = require("../../middlewares/checkLogin");

const authRoute = Router();

// user registration
authRoute.post("/register", userMiddlewares.uploader, validateRequest(userValidations.userRegistrationValidationSchema, userMiddlewares.deteteUploadedPhotoIfValidationFailed), userController.register);

authRoute.post("/verify", validateRequest(userValidations.verifyUser), userController.verifyUser);
authRoute.post("/sendcode", validateRequest(userValidations.sendCodeValidation), userController.sendCodeToResetPass);
authRoute.post("/resetpass", userValidations.resetPassValidation, userController.resetPass);
// user login
authRoute.post("/login", validateRequest(userValidations.loginValidationSchema), userController.login);

const userRoute = Router();
// user info update
userRoute.post("/", userMiddlewares.uploader, checkLogin, validateRequest(userValidations.updateUserValidationSchema), userController.updateUserInfo);

module.exports = { authRoute, userRoute };