const { z } = require("zod");

const userValidations = {};

userValidations.userRegistrationValidationSchema = z.object({
    body: z.object({
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
    }),
});

userValidations.updateUserValidationSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, "First name cannot be empty").optional(),
        lastName: z.string().min(1, "Last name cannot be empty").optional(),
        password: z.string().min(6, "Password must be at least 6 characters").optional(),
        profile: z.string().optional()
    }).partial()
});



userValidations.loginValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
        }).email("Invalid email address"),

        password: z.string({
            required_error: "Password is required",
        })
    })
});

module.exports = userValidations;
