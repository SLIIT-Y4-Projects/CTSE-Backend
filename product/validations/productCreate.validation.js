const { z } = require("zod");
//
const productCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  countInStock: z.number(),
});
//
module.exports = productCreateSchema;
