import { Link } from "wouter";
import { useGetFeaturedProducts } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";

const BENEFITS = [
  "No minimum order quantity for ready-made items",
  "Available in stock — ships within 3–5 working days",
  "Wide selection of colours and sizes (XS to 5XL)",
  "Mix and match sizes and colours",
  "Perfect for small events, sampling, or trial orders",
  "Add printing to any ready-made garment",
];

export default function ReadyMade() {
  const featured = useGetFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Ready Made Apparel</p>
          <h1 className="text-4xl font-black mb-6">In Stock. Ships Fast.<br />Ready to Print.</h1>
          <p className="text-gray-400 text-lg mb-8">
            Premium blank garments from Gildan, Oren Sport, Crossrunner, and more — available immediately, ready for your custom print.
          </p>
          <Link href="/shop" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            SHOP READY MADE
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">READY WHEN YOU ARE</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#D31F26] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/custom-made#quote" className="inline-block mt-8 bg-[#D31F26] text-white font-black px-6 py-3 hover:bg-red-700 transition-colors">
              ADD PRINTING TO YOUR ORDER
            </Link>
          </div>
          <div className="bg-gray-100 aspect-square overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
              alt="Ready made apparel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">POPULAR READY MADE PRODUCTS</h2>
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

      {/* Brands */}
      <section className="max-w-5xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-3">OUR READY MADE BRANDS</h2>
        <p className="text-gray-500 mb-8">We stock only trusted, print-ready garment brands.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {["Gildan", "Oren Sport", "Crossrunner", "North Harbour", "Enzo", "Adidas", "Puma"].map((b) => (
            <div key={b} className="border border-gray-200 px-6 py-3 font-black text-gray-600 hover:border-[#D31F26] hover:text-[#D31F26] transition-colors cursor-default">
              {b}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
