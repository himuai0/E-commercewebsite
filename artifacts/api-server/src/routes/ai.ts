import { Router } from "express";
import { GenerateProductBody } from "@workspace/api-zod";

const router = Router();

const APPAREL_TEMPLATES: Record<string, any> = {
  "phone accessories": {
    types: ["Phone Case", "Phone Stand", "Wireless Charger Pouch", "Phone Wallet"],
    materials: ["Premium silicone", "Recycled polyester", "Cotton canvas"],
    tags: ["phone", "accessories", "tech", "gadget", "custom"],
  },
  "corporate": {
    types: ["Corporate Polo", "Business Uniform", "Executive Shirt"],
    materials: ["65% Polyester 35% Cotton", "Microfibre 160gsm", "100% Cotton 180gsm"],
    tags: ["corporate", "business", "uniform", "professional"],
  },
  "event": {
    types: ["Event T-Shirt", "Volunteer Vest", "Event Polo"],
    materials: ["100% Cotton 160gsm", "Microfibre", "65% Polyester 35% Cotton"],
    tags: ["event", "team", "uniform", "custom"],
  },
  default: {
    types: ["Custom T-Shirt", "Polo Shirt", "Hoodie", "Uniform"],
    materials: ["100% Cotton 180gsm", "Microfibre 160gsm", "65% Polyester 35% Cotton"],
    tags: ["custom", "apparel", "clothing", "branded"],
  },
};

function getTemplate(niche: string) {
  const lower = niche.toLowerCase();
  for (const key of Object.keys(APPAREL_TEMPLATES)) {
    if (lower.includes(key)) return APPAREL_TEMPLATES[key];
  }
  return APPAREL_TEMPLATES.default;
}

router.post("/generate-product", (req, res) => {
  try {
    const parsed = GenerateProductBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const { niche, audience = "general public", priceRange = "mid-range", style = "casual", material } = parsed.data;
    const template = getTemplate(niche);
    const productType = template.types[Math.floor(Math.random() * template.types.length)];
    const chosenMaterial = material || template.materials[Math.floor(Math.random() * template.materials.length)];

    const nicheCapitalized = niche.charAt(0).toUpperCase() + niche.slice(1);
    const title = `Custom ${nicheCapitalized} ${productType}`;

    const priceMap: Record<string, { min: number; max: number }> = {
      "budget": { min: 12, max: 18 },
      "mid-range": { min: 18, max: 35 },
      "premium": { min: 35, max: 80 },
    };
    const price = priceMap[priceRange] || priceMap["mid-range"];

    const generated = {
      title,
      shortDescription: `Premium custom ${productType.toLowerCase()} designed for ${audience}. Perfect for ${niche} branding and ${style} occasions.`,
      longDescription: `Elevate your ${niche} brand with this premium custom ${productType.toLowerCase()}. Made from ${chosenMaterial}, this piece is designed for ${audience} who value quality and style. Perfect for ${style} occasions, events, and everyday wear. Supports Embroidery, Silk screen, Heat press, and Direct-to-Film (DTF) printing. Bulk discounts available.`,
      specs: {
        "Product Type": productType,
        "Material": chosenMaterial,
        "Gender": "Unisex",
        "Available Printing": "Embroidery, Silk screen, Heat press, DTF",
        "Delivery": "7-14 working days after order confirmation",
      },
      seoTitle: `Custom ${nicheCapitalized} ${productType} Malaysia | TMaker`,
      seoDescription: `Order custom ${productType.toLowerCase()} for ${audience} in Malaysia. ${nicheCapitalized} branded apparel with fast turnaround and bulk discounts. Get a free quote today!`,
      suggestedCategory: niche.toLowerCase().includes("polo") ? "polo-unisex-men" :
        niche.toLowerCase().includes("uniform") ? "uniforms-unisex-men" :
        niche.toLowerCase().includes("oversized") ? "oversized-unisex-men" :
        "t-shirt-unisex-men",
      tags: [...template.tags, style, audience.split(" ")[0]].filter(Boolean),
      variants: [
        { color: "Black", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
        { color: "White", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
        { color: "Navy", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
        { color: "Red", sizes: ["S", "M", "L", "XL", "2XL"] },
      ],
      estimatedPrice: { min: price.min, max: price.max },
    };

    req.log.info({ niche, productType }, "Generated product");
    res.json(generated);
  } catch (err) {
    req.log.error({ err }, "Failed to generate product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
