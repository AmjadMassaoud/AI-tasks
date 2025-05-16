import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const fetchAndValidateProducts = action({
  args: {},
  handler: async (ctx) => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}`);
    }
    const products = await response.json();
    
    for (const product of products) {
      const errors = validateProduct(product);
      await ctx.runMutation(api.products.storeProduct, {
        product: {
          title: product.title,
          price: product.price,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count
          },
          description: product.description,
          category: product.category,
          image: product.image,
          validationErrors: errors
        }
      });
    }
    return products.length;
  }
});

export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  }
});

export const clearProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    for (const product of products) {
      await ctx.db.delete(product._id);
    }
  }
});

export const storeProduct = mutation({
  args: {
    product: v.object({
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("products", args.product);
  }
});

function validateProduct(product: any): string[] {
  const errors: string[] = [];
  
  if (!product.title || product.title.trim() === '') {
    errors.push('Title is empty');
  }
  
  if (product.price < 0) {
    errors.push('Price is negative');
  }
  
  if (product.rating?.rate > 5) {
    errors.push('Rating exceeds 5');
  }
  
  return errors;
}
