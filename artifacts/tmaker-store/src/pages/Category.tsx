import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetCategory, useListCategories, getGetCategoryQueryKey } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ChevronDown, LayoutGrid, List } from "lucide-react";
import type { Category as CatType } from "@workspace/api-client-react";

const CATEGORY_IMGS: Record<string, string> = {
  "t-shirt-unisex-men": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
  "polo-unisex-men": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=300&fit=crop",
  "hoodies-sweatshirts-unisex-men": "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=400&h=300&fit=crop",
  "jackets-windbreakers-unisex-men": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop",
  "uniforms-unisex-men": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
  "pants-unisex-men": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop",
  "vest-unisex-men": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=300&fit=crop",
  "singlet-tank-top-unisex-men": "https://images.unsplash.com/photo-1622445572190-eda1cb9a3cd5?w=400&h=300&fit=crop",
  "oversized-unisex-men": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=300&fit=crop",
  "unisex-men": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop",
  "women": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "kids": "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop",
  "apparel": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop",
  "hot-items-promotions": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
};

const TILE_BG: Record<string, string> = {
  "t-shirt-unisex-men": "#e8f4f8",
  "polo-unisex-men": "#f8ece8",
  "hoodies-sweatshirts-unisex-men": "#f0edf8",
  "jackets-windbreakers-unisex-men": "#e8f0e8",
  "uniforms-unisex-men": "#fdf2e8",
  "pants-unisex-men": "#f8f0e8",
  "vest-unisex-men": "#e8f8f0",
  "singlet-tank-top-unisex-men": "#f8e8f0",
  "oversized-unisex-men": "#f0f8e8",
  "unisex-men": "#e8f0f8",
  "women": "#f8e8ec",
  "kids": "#f0f8e8",
};

function ProductSkeleton() {
  return (
    <div className="border border-gray-200 bg-white">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    </div>
  );
}

function SidebarSection({
  label,
  children,
  defaultOpen = false,
  isActive = false,
}: {
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isActive?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen || isActive);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-black tracking-wide transition-colors ${isActive ? "text-[#D31F26]" : "text-gray-700 hover:text-[#D31F26]"}`}
      >
        {label}
        {open
          ? <ChevronDown className={`w-3.5 h-3.5 ${isActive ? "text-[#D31F26]" : ""}`} />
          : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
      {open && children && (
        <div className="pb-2">{children}</div>
      )}
    </div>
  );
}

function Sidebar({ categories, currentSlug }: { categories: CatType[]; currentSlug: string }) {
  const hotItems = categories.find((c) => c.slug === "hot-items-promotions");
  const apparel = categories.find((c) => c.slug === "apparel");
  const accessories = categories.find((c) => c.slug === "accessories-merchandises");
  const brands = categories.find((c) => c.slug === "brands");

  const isUnderApparel = (slug: string): boolean => {
    if (!apparel) return false;
    const checkChildren = (cats: CatType[]): boolean =>
      cats.some((c) => c.slug === slug || (c.children ? checkChildren(c.children) : false));
    return checkChildren(apparel.children || []);
  };

  const isApparelActive = currentSlug === "apparel" || isUnderApparel(currentSlug);

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="border border-gray-200">
        {/* Hot Items */}
        {hotItems && (
          <SidebarSection label="HOT ITEMS & PROMOTIONS" isActive={currentSlug === "hot-items-promotions"}>
            <Link
              href="/product-category/hot-items-promotions"
              className={`block pl-6 py-1.5 text-sm hover:text-[#D31F26] ${currentSlug === "hot-items-promotions" ? "text-[#D31F26] font-bold" : "text-gray-600"}`}
            >
              All Hot Items
            </Link>
          </SidebarSection>
        )}

        {/* Apparel */}
        {apparel && (
          <SidebarSection label="APPAREL" defaultOpen isActive={isApparelActive}>
            {apparel.children?.map((gender) => (
              <div key={gender.slug}>
                <Link
                  href={`/product-category/${gender.slug}`}
                  className={`block pl-5 py-1.5 text-sm font-semibold hover:text-[#D31F26] transition-colors ${currentSlug === gender.slug ? "text-[#D31F26] font-bold" : "text-gray-700"}`}
                >
                  {gender.name}
                </Link>
                {(currentSlug === gender.slug || (gender.children?.some((c) => c.slug === currentSlug))) && gender.children?.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/product-category/${sub.slug}`}
                    className={`block pl-8 py-1 text-xs hover:text-[#D31F26] transition-colors ${currentSlug === sub.slug ? "text-[#D31F26] font-bold" : "text-gray-500"}`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Accessories */}
        {accessories ? (
          <SidebarSection label="ACCESSORIES & MERCHANDISES" isActive={currentSlug === "accessories-merchandises"}>
            {accessories.children?.map((c) => (
              <Link
                key={c.slug}
                href={`/product-category/${c.slug}`}
                className={`block pl-6 py-1.5 text-sm hover:text-[#D31F26] ${currentSlug === c.slug ? "text-[#D31F26] font-bold" : "text-gray-600"}`}
              >
                {c.name}
              </Link>
            ))}
          </SidebarSection>
        ) : (
          <SidebarSection label="ACCESSORIES & MERCHANDISES">
            <Link href="/shop" className="block pl-6 py-1.5 text-sm text-gray-500 hover:text-[#D31F26]">View All</Link>
          </SidebarSection>
        )}

        {/* Brands */}
        {brands ? (
          <SidebarSection label="BRANDS" isActive={currentSlug === "brands"}>
            {brands.children?.map((c) => (
              <Link
                key={c.slug}
                href={`/product-category/${c.slug}`}
                className={`block pl-6 py-1.5 text-sm hover:text-[#D31F26] ${currentSlug === c.slug ? "text-[#D31F26] font-bold" : "text-gray-600"}`}
              >
                {c.name}
              </Link>
            ))}
          </SidebarSection>
        ) : (
          <SidebarSection label="BRANDS">
            <Link href="/shop" className="block pl-6 py-1.5 text-sm text-gray-500 hover:text-[#D31F26]">View All</Link>
          </SidebarSection>
        )}
      </div>
    </aside>
  );
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const categoryQuery = useGetCategory(slug, {
    query: { enabled: !!slug, queryKey: getGetCategoryQueryKey(slug) }
  });
  const categoriesQuery = useListCategories();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allCategories = categoriesQuery.data?.categories || [];

  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="flex gap-6">
          <Skeleton className="w-56 h-64 hidden lg:block shrink-0" />
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array(8).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (categoryQuery.error || !categoryQuery.data) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-gray-800 mb-2">Category Not Found</h1>
        <p className="text-gray-500 mb-6">This category doesn't exist or has been removed.</p>
        <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-6 py-3 hover:bg-red-700 transition-colors">
          Browse All Products
        </Link>
      </div>
    );
  }

  const { category, products, total } = categoryQuery.data;

  // Build breadcrumb path by finding parents
  const buildBreadcrumb = (): CatType[] => {
    const path: CatType[] = [];
    const findPath = (cats: CatType[], target: string): boolean => {
      for (const cat of cats) {
        if (cat.slug === target) { path.push(cat); return true; }
        if (cat.children && findPath(cat.children, target)) { path.unshift(cat); return true; }
      }
      return false;
    };
    findPath(allCategories, slug);
    return path;
  };
  const breadcrumb = buildBreadcrumb();

  // Decide: show subcategory tiles or products
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 flex-wrap">
        <Link href="/" className="hover:text-[#D31F26]">Home</Link>
        {breadcrumb.map((bc, i) => (
          <span key={bc.slug} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            {i === breadcrumb.length - 1
              ? <span className="text-gray-800 font-semibold">{bc.name}</span>
              : <Link href={`/product-category/${bc.slug}`} className="hover:text-[#D31F26]">{bc.name}</Link>
            }
          </span>
        ))}
      </nav>

      <div className="flex gap-6">
        <Sidebar categories={allCategories} currentSlug={slug} />

        <div className="flex-1 min-w-0">
          {/* Category header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black text-gray-900">
              {category.name}
              {!hasChildren && <span className="text-gray-400 font-normal text-base ml-1">({total})</span>}
            </h1>
            {!hasChildren && (
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode("grid")} className={`p-1 ${viewMode === "grid" ? "text-[#D31F26]" : "text-gray-400 hover:text-gray-600"}`}>
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-1 ${viewMode === "list" ? "text-[#D31F26]" : "text-gray-400 hover:text-gray-600"}`}>
                  <List className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Quote banner — matches real site: light grey bg, "Get A Quote" red rounded button */}
          <div className="bg-gray-50 border border-gray-200 px-5 py-3 mb-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-bold text-gray-800">Need logo customisation or bulk pricing?</p>
              <p className="text-xs text-gray-500">Choose a product, then send Nashah Advisory your quantity, logo and deadline for a fast recommendation.</p>
            </div>
            <Link
              href="/custom-made#quote"
              className="bg-[#D31F26] text-white text-sm font-black px-5 py-2 rounded hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Get A Quote
            </Link>
          </div>

          {/* Subcategory tiles (for parent categories like Apparel, Unisex/Men) */}
          {hasChildren ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.children!.map((child) => {
                const img = CATEGORY_IMGS[child.slug] || CATEGORY_IMGS["apparel"];
                const bg = TILE_BG[child.slug] || "#f5f5f5";
                return (
                  <Link
                    key={child.slug}
                    href={`/product-category/${child.slug}`}
                    className="relative overflow-hidden group border border-gray-100 hover:border-[#D31F26] transition-colors"
                    style={{ aspectRatio: "4/3", background: bg }}
                  >
                    <img
                      src={img}
                      alt={child.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-black text-sm leading-tight">{child.name}</p>
                      {child.productCount !== undefined && (
                        <p className="text-white/80 text-xs">{child.productCount}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 border border-gray-200">
              <h3 className="font-black text-xl text-gray-800 mb-2">No products in this category</h3>
              <p className="text-gray-500 mb-6">Check back soon or browse all products.</p>
              <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-6 py-2 hover:bg-red-700 transition-colors">Browse All</Link>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/shop/${p.slug}`}
                  className="flex gap-4 border border-gray-200 p-4 hover:border-[#D31F26] transition-colors"
                >
                  <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">{p.brand}</p>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{p.name}</h3>
                    <p className="text-sm font-black text-[#D31F26]">RM {p.priceMin.toFixed(2)} – RM {p.priceMax.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom CTA banner for parent categories */}
          {hasChildren && (
            <div className="mt-10 bg-[#D31F26] text-white text-center py-10">
              <h2 className="font-black text-xl mb-1 tracking-wide">YOU IMAGINE IT. WE PRODUCE IT.</h2>
              <Link
                href="/custom-made#quote"
                className="inline-block mt-4 bg-black text-white font-black px-8 py-2.5 rounded hover:bg-gray-800 transition-colors"
              >
                TALK TO US
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
