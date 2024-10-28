const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const campaignController = require("./campaign.controller");
const campaignValidations = require("./campaign.validation");
const checkAdmin = require("../../middlewares/checkAdmin");
const upload = require("../../utils/upload");
const campaignMiddlewares = require("./campaign.middlewares");

const campaignRouter = Router();

campaignRouter.post("/", checkAdmin, upload("campaigns").array("images", 3), validateRequest(campaignValidations.createCampaign, campaignMiddlewares.deteteUploadedPhotoIfValidationFailed), campaignController.createCampaign);

module.exports = campaignRouter;