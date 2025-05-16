import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
  args: {
    category: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("expenses", {
      category: args.category,
      amount: args.amount,
    });
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("expenses").collect();
  },
});

export const stats = query({
  handler: async (ctx) => {
    const expenses = await ctx.db.query("expenses").collect();
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const dailyAverage = total / 30;
    const top3 = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return { total, dailyAverage, top3 };
  },
});
