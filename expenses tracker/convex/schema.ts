import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  expenses: defineTable({
    category: v.string(),
    amount: v.number(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
