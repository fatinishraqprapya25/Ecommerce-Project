const { z } = require("zod");

const campaignValidations = {};

campaignValidations.createCampaign = z.object({
    body: z.object({
        type: z.enum(["banner", "campaign"]).default("banner"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        discountPercentage: z.string()
            .refine(value => {
                const numValue = Number(value);
                return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
            }, {
                message: "Discount percentage must be a number between 0 and 100.",
            })
    })
});

module.exports = campaignValidations;
