import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  products: defineTable({
    title: v.string(),
    price: v.number(),
    rating: v.object({
      rate: v.number(),
      count: v.number()
    }),
    description: v.string(),
    category: v.string(),
    image: v.string(),
    validationErrors: v.array(v.string())
  })
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
