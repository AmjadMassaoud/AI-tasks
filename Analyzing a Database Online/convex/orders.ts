import { query } from "./_generated/server";

export const getMarchSales = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_date", (q) => 
        q.gte("orderDate", "2024-03-01").lt("orderDate", "2024-04-01")
      )
      .collect();
    
    return orders.reduce((sum, order) => sum + order.amount, 0);
  },
});

export const getTopCustomer = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    const customerTotals = orders.reduce((acc, order) => {
      acc[order.customer] = (acc[order.customer] || 0) + order.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(customerTotals)
      .sort(([,a], [,b]) => b - a)[0];
  },
});

export const getAverageOrder = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    return total / orders.length;
  },
});
