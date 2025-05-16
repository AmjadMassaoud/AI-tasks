import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  orders: defineTable({
    customer: v.string(),
    amount: v.number(),
    orderDate: v.string(),
  }).index("by_date", ["orderDate"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
