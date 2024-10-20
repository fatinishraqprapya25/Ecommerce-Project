const { z } = require("zod");

const adminValidations = {};

adminValidations.createAdminValidation = z.object({
    body: z.object({
        email: z.string().email("Invalid email address")
    })
});

module.exports = adminValidations;
