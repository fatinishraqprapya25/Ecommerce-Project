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
        price: z.number()
            .min(0, "Price must be a non-negative number"),
        discount: z.number()
            .min(0, "Discount must be at least 0%")
            .max(100, "Discount cannot exceed 100%"),
        stock: z.number()
            .min(0, "Stock must be a non-negative number")
            .default(0),
        brand: z.string()
            .max(50, "Brand name must be at most 50 characters long")
    })
});

module.exports = productValidations;