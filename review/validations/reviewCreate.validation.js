const { z } = require("zod");
//
const reviewCreateSchema = z.object({
  product: z.string(),
  rating: z.number(),
  comment: z.string(),
});
//
module.exports = reviewCreateSchema;
