const { z } = require('zod');

const productValidations = {};

productValidations.createSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, "Product name must be at least 3 characters long")
            .max(100, "Product name must be at most 100 characters long"),
        description: z.string()
            .max(2000, "Description must be at most 2000 characters long"),
        category: z.enum(['Electronics', 'Clothing', 'Books', 'Accessories', 'Home Appliances', 'Others'], {
            required_error: "Category is required"
        }),
        price: z.string()
            .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
                message: "Price must be a non-negative number",
            }),
        discount: z.string()
            .optional()
            .refine(value => !value || (!isNaN(Number(value)) && Number(value) >= 0), {
                message: "Discount must be a non-negative number or omitted",
            }),
        stock: z.string()
            .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
                message: "Stock must be a non-negative number",
            }),
        brand: z.string()
            .max(50, "Brand name must be at most 50 characters long"),
        isFeatured: z.boolean().optional(),
    })
});


module.exports = productValidations;