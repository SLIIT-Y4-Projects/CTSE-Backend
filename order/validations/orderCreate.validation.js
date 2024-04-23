const { z } = require("zod");
//
const orderCreateSchema = z.object({
  orderItems: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().int(),
    })
  ),
  shippingAddress: z.string(),
  totalPrice: z.number(),
});
//
module.exports = orderCreateSchema;
