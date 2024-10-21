const { Router } = require("express");
const adminController = require("./admin.controller");
const validateRequest = require("../../middlewares/validateRequest");
const adminValidations = require("./admin.validation");
const checkAdmin = require("../../middlewares/checkAdmin");

const adminRoute = Router();

adminRoute.post("/", checkAdmin, validateRequest(adminValidations.createAdminValidation), adminController.createAdmin);

module.exports = adminRoute;