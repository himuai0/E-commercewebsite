import { Router } from "express";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { ilike, eq, asc, desc, or, and } from "drizzle-orm";

const router = Router();

function formatProduct(p: typeof productsTable.$inferSelect) {
  const colors = p.colors || [];
  const sizes = p.sizes || [];
  const variants = colors.map((color: string) => ({
    color,
    colorHex: undefined,
    sizes,
  }));
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    productType: p.productType,
    material: p.material,
    collar: p.collar,
    sleeveStyle: p.sleeveStyle,
    gender: p.gender,
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    originalPriceMin: p.originalPriceMin,
    originalPriceMax: p.originalPriceMax,
    discountPercent: p.discountPercent,
    currency: p.currency,
    categorySlug: p.categorySlug,
    variants,
    imageUrl: p.imageUrl,
    images: p.images || [p.imageUrl],
    description: p.description,
    printingMethods: p.printingMethods || [],
    isHot: p.isHot,
    isFeatured: p.isFeatured,
    stock: p.stock,
  };
}

router.get("/", async (req, res) => {
  try {
    const { category, search, sort, limit = "24", offset = "0" } = req.query as Record<string, string>;
    const conditions = [];
    if (category) conditions.push(eq(productsTable.categorySlug, category));
    if (search) conditions.push(ilike(productsTable.name, `%${search}%`));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sort) {
      case "price_asc": orderBy = asc(productsTable.priceMin); break;
      case "price_desc": orderBy = desc(productsTable.priceMin); break;
      case "latest": orderBy = desc(productsTable.id); break;
      default: orderBy = desc(productsTable.isFeatured);
    }

    const products = await db.select().from(productsTable)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    const total = products.length;
    req.log.info({ count: products.length }, "Listed products");
    res.json({ products: products.map(formatProduct), total });
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const products = await db.select().from(productsTable)
      .where(eq(productsTable.isFeatured, true))
      .limit(12);
    res.json({ products: products.map(formatProduct), total: products.length });
  } catch (err) {
    req.log.error({ err }, "Failed to get featured products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/hot", async (req, res) => {
  try {
    const products = await db.select().from(productsTable)
      .where(eq(productsTable.isHot, true))
      .limit(18);
    res.json({ products: products.map(formatProduct), total: products.length });
  } catch (err) {
    req.log.error({ err }, "Failed to get hot products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [product] = await db.select().from(productsTable).where(eq(productsTable.slug, slug));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(formatProduct(product));
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
