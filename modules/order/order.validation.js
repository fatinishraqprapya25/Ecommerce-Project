const { z } = require('zod');

const orderValidatdions = {};

orderValidatdions.createOrder = z.object({
    body: z.object({
        address: z.string().nonempty("Address is required"),
        paymentMethod: z.enum(['cash_on_delivery', 'bkash', 'nagad']),
    })
});


module.exports = orderValidatdions;
