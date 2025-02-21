const Campaign = require('./campaign.model');
const campaignServices = {};

campaignServices.createCampaign = async (campaignData) => {
    await Campaign.updateMany({}, { isActive: false });
    const campaign = new Campaign(campaignData);
    const result = await campaign.save();
    return result;
};

campaignServices.getAllCampaigns = async () => {
    const result = await Campaign.find();
    return result;
};

campaignServices.getAllActiveCampaigns = async () => {
    const result = await Campaign.find({ isActive: true });
    return result;
};

campaignServices.getCampaignById = async (campaignId) => {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    return campaign;
};

campaignServices.updateCampaign = async (campaignId, updateData) => {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        updateData,
        { new: true, runValidators: true }
    );
    if (!updatedCampaign) throw new Error("Campaign not found");
    return updatedCampaign;
};

module.exports = campaignServices;
