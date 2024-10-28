const campaignServices = require('./campaign.service');
const sendResponse = require('../../utils/sendResponse');

const campaignController = {};

campaignController.createCampaign = async (req, res) => {
    try {
        const campaignDetails = req.body;
        campaignDetails.isActive = true;

        const campaign = await campaignServices.createCampaign(campaignDetails);
        sendResponse(res, 201, {
            success: true,
            message: "Campaign created successfully!",
            data: campaign
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to create campaign",
            error: error.message
        });
    }
};

campaignController.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignServices.getAllCampaigns();
        sendResponse(res, 200, {
            success: true,
            message: "Campaigns retrieved successfully",
            data: campaigns
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving campaigns",
            error: error.message
        });
    }
};

campaignController.getCampaignById = async (req, res) => {
    try {
        const campaign = await campaignServices.getCampaignById(req.params.id);
        if (!campaign) {
            return sendResponse(res, 404, {
                success: false,
                message: "Campaign not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Campaign found",
            data: campaign
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving campaign",
            error: error.message
        });
    }
};

campaignController.updateCampaign = async (req, res) => {
    try {
        const updatedCampaign = await campaignServices.updateCampaign(req.params.id, req.body);
        if (!updatedCampaign) {
            return sendResponse(res, 404, {
                success: false,
                message: "Campaign not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Campaign updated successfully",
            data: updatedCampaign
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: "Error updating campaign",
            error: error.message
        });
    }
};

module.exports = campaignController;
