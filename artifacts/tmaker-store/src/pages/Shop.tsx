import { useState } from "react";
import { useSearch } from "wouter";
import { useListProducts, useListCategories, getListProductsQueryKey } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ListProductsParams, Category } from "@workspace/api-client-react";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";

const BRANDS = ["Gildan", "Oren Sport", "Crossrunner", "North Harbour", "Enzo"];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

function CategoryTree({ categories, selectedCat, onSelect }: {
  categories: Category[];
  selectedCat: string;
  onSelect: (slug: string) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["apparel", "unisex-men"]));

  function toggle(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  }

  function renderCat(cat: Category, depth = 0) {
    const hasChildren = (cat.children?.length ?? 0) > 0;
    const isExpanded = expanded.has(cat.slug);
    const isSelected = selectedCat === cat.slug;
    return (
      <div key={cat.slug}>
        <div
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer hover:text-[#D31F26] transition-colors text-sm ${isSelected ? "text-[#D31F26] font-bold" : "text-gray-700"}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            onSelect(isSelected ? "" : cat.slug);
            if (hasChildren) toggle(cat.slug);
          }}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />
          ) : <span className="w-3" />}
          <span>{cat.name}</span>
        </div>
        {hasChildren && isExpanded && cat.children?.map((c) => renderCat(c, depth + 1))}
      </div>
    );
  }

  return <div>{categories.map((c) => renderCat(c))}</div>;
}

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

export default function Shop() {
  const searchStr = useSearch();
  const urlParams = new URLSearchParams(searchStr);
  const initialSearch = urlParams.get("search") || "";

  const [params, setParams] = useState<ListProductsParams>({
    search: initialSearch || undefined,
    category: undefined,
    sort: "popular",
    limit: 24,
    offset: 0,
  });
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const productsQuery = useListProducts(params, {
    query: { queryKey: getListProductsQueryKey(params) }
  });
  const categoriesQuery = useListCategories();
  const categories = categoriesQuery.data?.categories || [];

  function setCategory(slug: string) {
    setParams((p) => ({ ...p, category: slug || undefined, offset: 0 }));
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand); else next.add(brand);
      return next;
    });
  }

  const allProducts = productsQuery.data?.products || [];
  const products = selectedBrands.size > 0
    ? allProducts.filter((p) => selectedBrands.has(p.brand))
    : allProducts;

  const title = params.search
    ? `Search results for "${params.search}"`
    : params.category
    ? categories.find((c: Category) => c.slug === params.category)?.name || "Products"
    : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{title}</h1>
          {products.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">{products.length} products</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 text-sm font-semibold"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select
            value={params.sort || "popular"}
            onChange={(e) => setParams((p) => ({ ...p, sort: e.target.value as ListProductsParams["sort"], offset: 0 }))}
            className="border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#D31F26]"
            data-testid="select-sort"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block w-56 shrink-0`}>
          {/* Category */}
          <div className="border border-gray-200 mb-4">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800">Categories</h3>
            </div>
            <div className="py-2">
              <div
                className={`py-1 px-4 cursor-pointer hover:text-[#D31F26] text-sm transition-colors ${!params.category ? "text-[#D31F26] font-bold" : "text-gray-700"}`}
                onClick={() => setCategory("")}
              >
                All Products
              </div>
              <CategoryTree categories={categories} selectedCat={params.category || ""} onSelect={setCategory} />
            </div>
          </div>

          {/* Brand filter */}
          <div className="border border-gray-200 mb-4">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800">Brand</h3>
            </div>
            <div className="py-2 px-4 space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-[#D31F26]">
                  <input
                    type="checkbox"
                    checked={selectedBrands.has(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-[#D31F26]"
                    data-testid={`checkbox-brand-${brand}`}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800">Sort by Price</h3>
            </div>
            <div className="py-2 px-4 space-y-1">
              {SORT_OPTIONS.filter((o) => o.value.startsWith("price")).map((o) => (
                <div
                  key={o.value}
                  className={`py-1 text-sm cursor-pointer hover:text-[#D31F26] transition-colors ${params.sort === o.value ? "text-[#D31F26] font-bold" : "text-gray-700"}`}
                  onClick={() => setParams((p) => ({ ...p, sort: o.value as ListProductsParams["sort"] }))}
                >
                  {o.label}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {/* Quote banner */}
          <div className="bg-[#D31F26] text-white px-5 py-3 mb-6 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm font-semibold">Need logo customisation or bulk pricing?</p>
            <a href="/custom-made#quote" className="bg-white text-[#D31F26] text-xs font-black px-4 py-1.5 hover:bg-gray-100 transition-colors">
              GET A QUOTE
            </a>
          </div>

          {productsQuery.isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array(8).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 border border-gray-200">
              <p className="text-4xl mb-4">👕</p>
              <h3 className="font-black text-xl text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search term.</p>
              <button
                className="bg-[#D31F26] text-white font-bold px-6 py-2 hover:bg-red-700 transition-colors"
                onClick={() => setParams({ sort: "popular", limit: 24, offset: 0 })}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
