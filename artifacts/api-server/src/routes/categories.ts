import { Router } from "express";
import { db, categoriesTable, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const all = await db.select().from(categoriesTable).orderBy(asc(categoriesTable.sortOrder));

    const map = new Map<string, any>();
    const roots: any[] = [];

    for (const cat of all) {
      map.set(cat.slug, { ...cat, children: [] });
    }

    for (const cat of all) {
      const node = map.get(cat.slug)!;
      if (cat.parentSlug && map.has(cat.parentSlug)) {
        map.get(cat.parentSlug)!.children.push(node);
      } else {
        roots.push(node);
      }
    }

    res.json({ categories: roots });
  } catch (err) {
    req.log.error({ err }, "Failed to list categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    const products = await db.select().from(productsTable).where(eq(productsTable.categorySlug, slug)).limit(50);

    const colors = (p: typeof productsTable.$inferSelect) => (p.colors || []).map((color: string) => ({ color, sizes: p.sizes || [] }));

    res.json({
      category: { ...category, children: [] },
      products: products.map(p => ({
        id: p.id, slug: p.slug, name: p.name, brand: p.brand,
        productType: p.productType, material: p.material, collar: p.collar,
        sleeveStyle: p.sleeveStyle, gender: p.gender,
        priceMin: p.priceMin, priceMax: p.priceMax,
        originalPriceMin: p.originalPriceMin, originalPriceMax: p.originalPriceMax,
        discountPercent: p.discountPercent, currency: p.currency,
        categorySlug: p.categorySlug, variants: colors(p), imageUrl: p.imageUrl,
        images: p.images || [p.imageUrl], description: p.description,
        printingMethods: p.printingMethods || [], isHot: p.isHot,
        isFeatured: p.isFeatured, stock: p.stock,
      })),
      total: products.length,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get category");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
