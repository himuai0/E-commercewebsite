import { useParams, Link } from "wouter";
import { useGetCategory, useListCategories, getGetCategoryQueryKey } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import type { Category as CatType } from "@workspace/api-client-react";

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

function Sidebar({ categories, currentSlug }: { categories: CatType[]; currentSlug: string }) {
  function renderCat(cat: CatType, depth = 0): React.ReactNode {
    const isSelected = cat.slug === currentSlug;
    return (
      <div key={cat.slug}>
        <Link
          href={`/product-category/${cat.slug}`}
          className={`block py-1.5 text-sm transition-colors hover:text-[#D31F26] ${isSelected ? "text-[#D31F26] font-bold" : "text-gray-700"}`}
          style={{ paddingLeft: `${depth * 12 + 16}px` }}
        >
          {cat.name}
        </Link>
        {cat.children?.map((c) => renderCat(c, depth + 1))}
      </div>
    );
  }

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="border border-gray-200">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="font-bold text-sm text-gray-800">Categories</h3>
        </div>
        <div className="py-2">
          {categories.map((c) => renderCat(c))}
        </div>
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

  const allCategories = categoriesQuery.data?.categories || [];

  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="flex gap-6">
          <Skeleton className="w-56 h-64 hidden lg:block" />
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array(8).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (categoryQuery.error || !categoryQuery.data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-4xl mb-4">🏷️</p>
        <h1 className="text-2xl font-black text-gray-800 mb-2">Category Not Found</h1>
        <p className="text-gray-500 mb-6">This category doesn't exist or has been removed.</p>
        <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-6 py-3 hover:bg-red-700 transition-colors">
          Browse All Products
        </Link>
      </div>
    );
  }

  const { category, products, total } = categoryQuery.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#D31F26]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-[#D31F26]">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-semibold">{category.name}</span>
      </nav>

      <div className="flex gap-6">
        <Sidebar categories={allCategories} currentSlug={slug} />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-gray-900">{category.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{total} products</p>
            </div>
          </div>

          {/* Quote banner */}
          <div className="bg-[#D31F26] text-white px-5 py-3 mb-6 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm font-semibold">Need logo customisation or bulk pricing?</p>
            <Link href="/custom-made#quote" className="bg-white text-[#D31F26] text-xs font-black px-4 py-1.5 hover:bg-gray-100 transition-colors">
              GET A QUOTE
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 border border-gray-200">
              <p className="text-4xl mb-4">👕</p>
              <h3 className="font-black text-xl text-gray-800 mb-2">No products in this category</h3>
              <p className="text-gray-500 mb-6">Check back soon or browse all products.</p>
              <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-6 py-2 hover:bg-red-700 transition-colors">
                Browse All
              </Link>
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
