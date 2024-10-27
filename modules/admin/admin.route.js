const { Router } = require("express");
const adminController = require("./admin.controller");
const validateRequest = require("../../middlewares/validateRequest");
const adminValidations = require("./admin.validation");
const checkAdmin = require("../../middlewares/checkAdmin");

const adminRoute = Router();

adminRoute.post("/", checkAdmin, validateRequest(adminValidations.createAdminValidation), adminController.createAdmin);
adminRoute.get("/", checkAdmin, adminController.getAllAdmins);
adminRoute.get("/:id", checkAdmin, adminController.findAdminById);
adminRoute.delete("/:id", checkAdmin, adminController.removeAdmin);

adminRoute.post("/enable/:id", checkAdmin, adminController.enableUser);
adminRoute.post("/disable/:id", checkAdmin, adminController.disableUser);

module.exports = adminRoute;