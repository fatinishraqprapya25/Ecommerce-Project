const { z } = require("zod");

const ratingValidations = {};

ratingValidations.createRatingValidation = z.object({
    rating: z
        .string()
        .refine((val) => {
            const num = Number(val);
            return Number.isInteger(num) && num >= 1 && num <= 5;
        }, {
            message: "Rating must be an integer between 1 and 5",
        }),
    productId: z
        .string()
        .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid productId ObjectId",
        }),
});

module.exports = ratingValidations;
