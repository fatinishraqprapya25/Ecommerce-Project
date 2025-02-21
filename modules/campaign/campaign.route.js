const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const campaignController = require("./campaign.controller");
const campaignValidations = require("./campaign.validation");
const checkAdmin = require("../../middlewares/checkAdmin");
const upload = require("../../utils/upload");
const campaignMiddlewares = require("./campaign.middlewares");

const campaignRouter = Router();

const CAMPAIGN_IMAGE_MAX_SIZE = 15;
const CAMPAIGN_IMAGE_TYPES = /jpeg|jpg|png/;

campaignRouter.post("/", checkAdmin, upload("campaigns", CAMPAIGN_IMAGE_MAX_SIZE, CAMPAIGN_IMAGE_TYPES).array("images", 3), validateRequest(campaignValidations.createCampaign, campaignMiddlewares.deteteUploadedPhotoIfValidationFailed), campaignController.createCampaign);
campaignRouter.get("/", checkAdmin, campaignController.getAllCampaigns);
campaignRouter.get("/:id", checkAdmin, campaignController.getCampaignById);
campaignRouter.get("/:id", checkAdmin, campaignController.getCampaignById);
campaignRouter.patch("/:id", checkAdmin, campaignController.updateCampaign);

module.exports = campaignRouter;