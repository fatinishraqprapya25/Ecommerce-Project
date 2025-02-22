const { z } = require('zod');

const orderValidations = {};

orderValidations.createOrder = z.object({
    body: z.object({
        address: z.string().nonempty("Address is required"),
        paymentMethod: z.enum(['cash_on_delivery', 'bkash', 'nagad']),
        products: z.array(
            z.object({
                productId: z.string().nonempty("Product ID is required"),
                quantity: z.number().int().positive("Quantity must be a positive integer")
            })
        ).min(1, "At least one product is required"),
    })
});

module.exports = orderValidations;