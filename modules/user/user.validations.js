const { z } = require("zod");

const userValidations = {};

userValidations.userRegistrationValidationSchema = z.object({
    body: {
        firstName: z.string({
            required_error: "First name is required",
        }).min(1, "First name cannot be empty"),

        lastName: z.string({
            required_error: "Last name is required",
        }).min(1, "Last name cannot be empty"),

        email: z.string({
            required_error: "Email is required",
        }).email("Invalid email address"),

        password: z.string({
            required_error: "Password is required",
        }).min(6, "Password must be at least 6 characters"),
    }
});


module.exports = userValidations;
