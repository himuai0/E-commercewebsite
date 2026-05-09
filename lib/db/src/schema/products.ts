import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  productType: text("product_type"),
  material: text("material"),
  collar: text("collar"),
  sleeveStyle: text("sleeve_style"),
  gender: text("gender").default("Unisex"),
  priceMin: real("price_min").notNull(),
  priceMax: real("price_max").notNull(),
  originalPriceMin: real("original_price_min"),
  originalPriceMax: real("original_price_max"),
  discountPercent: integer("discount_percent").default(0),
  currency: text("currency").notNull().default("MYR"),
  categorySlug: text("category_slug").notNull(),
  imageUrl: text("image_url").notNull(),
  images: text("images").array().notNull().default([]),
  colors: text("colors").array().notNull().default([]),
  sizes: text("sizes").array().notNull().default([]),
  description: text("description"),
  printingMethods: text("printing_methods").array().notNull().default([]),
  isHot: boolean("is_hot").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  stock: integer("stock").notNull().default(100),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
