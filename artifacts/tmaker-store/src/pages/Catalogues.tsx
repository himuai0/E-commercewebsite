import { Link } from "wouter";
import { useGetFeaturedProducts } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const CATALOGUES = [
  { title: "T-Shirts 2025", desc: "Full collection of unisex t-shirts — round neck, V-neck, and polo variants.", cover: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop" },
  { title: "Polo Shirts 2025", desc: "Premium polo shirts — microfibre, cotton, honeycomb, and lacoste textures.", cover: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=400&fit=crop" },
  { title: "Corporate Uniforms 2025", desc: "F1 uniforms, workwear, and corporate polo collections.", cover: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=300&h=400&fit=crop" },
  { title: "Hoodies & Sweatshirts 2025", desc: "Thick cotton and fleece hoodies — perfect for cool weather and corporate events.", cover: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=400&fit=crop" },
];

export default function Catalogues() {
  const featured = useGetFeaturedProducts();

  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Catalogues</p>
          <h1 className="text-4xl font-black mb-6">TMaker Product Catalogues 2025</h1>
          <p className="text-gray-400 text-lg">Browse our full product range — download PDF catalogues or shop directly online.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-gray-900 mb-8">2025 CATALOGUES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CATALOGUES.map((c) => (
            <div key={c.title} className="border border-gray-200 hover:border-[#D31F26] transition-colors group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img src={c.cover} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-black text-gray-900 mb-1 text-sm group-hover:text-[#D31F26] transition-colors">{c.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{c.desc}</p>
                <button className="w-full bg-black text-white text-xs font-bold py-2 hover:bg-[#D31F26] transition-colors">
                  DOWNLOAD PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">FEATURED PRODUCTS</h2>
            <Link href="/shop" className="text-sm font-bold text-[#D31F26] hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featured.isLoading
              ? Array(6).fill(null).map((_, i) => (
                  <div key={i} className="border border-gray-200 bg-white">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                ))
              : featured.data?.products?.slice(0, 6).map((p) => <ProductCard key={p.slug} product={p} />)
            }
          </div>
        </div>
      </section>
    </div>
  );
}
