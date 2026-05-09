import { Link } from "wouter";
import { useGetFeaturedProducts, useGetHotProducts } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const PRINT_METHODS = [
  {
    name: "Sublimation",
    desc: "All-over full colour printing fused into the fabric — vivid, wash-resistant, no cracking.",
    href: "/sublimation",
    icon: "🎨",
  },
  {
    name: "Direct-to-Film (DTF)",
    desc: "High-detail prints on any fabric. No minimum order, perfect for small batches.",
    href: "/direct-to-film-dtf",
    icon: "🖨️",
  },
  {
    name: "Embroidery",
    desc: "Premium stitched branding for polo shirts, caps, and corporate uniforms.",
    href: "/shop",
    icon: "🧵",
  },
  {
    name: "Silkscreen",
    desc: "Cost-effective spot colour printing — ideal for large bulk orders.",
    href: "/shop",
    icon: "🖼️",
  },
];

const WHY_US = [
  { title: "Fast Turnaround", desc: "7–14 working days after order confirmation. Rush orders available." },
  { title: "Bulk Discounts", desc: "The more you order, the more you save — transparent tiered pricing." },
  { title: "Premium Quality", desc: "Top brands: Gildan, Oren Sport, Crossrunner, North Harbour, Enzo." },
  { title: "Full Customisation", desc: "Your logo, your colours, your design — we handle the rest." },
  { title: "Free Design Support", desc: "Our design team helps you create the perfect artwork at no extra cost." },
  { title: "Malaysia's Trusted Choice", desc: "Serving hundreds of corporates, SMEs, and event organisers since 2015." },
];

const CLIENTS = ["PETRONAS", "CELCOM", "MAXIS", "DIGI", "CIMB", "MAYBANK", "GENTING", "AIA", "PRUDENTIAL", "NESTLE", "UNILEVER", "GRAB"];

function ProductSkeleton() {
  return (
    <div className="border border-gray-200 bg-white">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    </div>
  );
}

export default function Home() {
  const featured = useGetFeaturedProducts();
  const hot = useGetHotProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=600&fit=crop"
            alt="Custom apparel hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <p className="text-[#D31F26] font-bold text-sm mb-3 tracking-widest uppercase">Malaysia's Custom Apparel Leader</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Your Brand.<br />
            <span className="text-[#D31F26]">Your Uniform.</span><br />
            Your Identity.
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            From 50 to 50,000 pieces — custom t-shirts, polos, uniforms, and corporate apparel with fast turnaround and bulk pricing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-8 py-3 hover:bg-red-700 transition-colors" data-testid="button-shop-now">
              SHOP NOW
            </Link>
            <Link href="/custom-made#quote" className="bg-white text-gray-900 font-bold px-8 py-3 hover:bg-gray-100 transition-colors">
              GET A FREE QUOTE
            </Link>
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <div className="bg-[#D31F26] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-bold text-lg">Need logo customisation or bulk pricing? Talk to our team.</p>
          <Link href="/custom-made#quote" className="bg-white text-[#D31F26] font-black px-6 py-2 hover:bg-gray-100 transition-colors text-sm whitespace-nowrap">
            GET A QUOTE
          </Link>
        </div>
      </div>

      {/* Category shortcuts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">BROWSE BY CATEGORY</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "T-Shirts", slug: "t-shirt-unisex-men", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
            { name: "Polo Shirts", slug: "polo-unisex-men", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=200&h=200&fit=crop" },
            { name: "Hoodies", slug: "hoodies-sweatshirts-unisex-men", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&h=200&fit=crop" },
            { name: "Uniforms", slug: "uniforms-unisex-men", img: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=200&h=200&fit=crop" },
            { name: "Oversized", slug: "oversized-unisex-men", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&h=200&fit=crop" },
            { name: "Vest", slug: "vest-unisex-men", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop" },
          ].map((cat) => (
            <Link key={cat.slug} href={`/product-category/${cat.slug}`} className="group text-center" data-testid={`link-category-${cat.slug}`}>
              <div className="aspect-square overflow-hidden bg-gray-100 mb-2">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-xs font-bold text-gray-700 group-hover:text-[#D31F26] transition-colors">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">FEATURED PRODUCTS</h2>
          <Link href="/shop" className="text-sm font-bold text-[#D31F26] hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featured.isLoading
            ? Array(6).fill(null).map((_, i) => <ProductSkeleton key={i} />)
            : featured.data?.products?.slice(0, 6).map((p) => <ProductCard key={p.slug} product={p} />)
          }
        </div>
      </section>

      {/* Print methods */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">PRINT METHODS</h2>
          <p className="text-gray-500 text-center mb-10">Four industry-leading techniques — all under one roof.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PRINT_METHODS.map((m) => (
              <Link key={m.name} href={m.href} className="group bg-white border border-gray-200 hover:border-[#D31F26] p-6 transition-all">
                <div className="text-3xl mb-4">{m.icon}</div>
                <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#D31F26] transition-colors">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot items */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">HOT ITEMS</h2>
            <p className="text-sm text-gray-500">Best-selling products loved by Malaysian brands</p>
          </div>
          <Link href="/shop" className="text-sm font-bold text-[#D31F26] hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {hot.isLoading
            ? Array(5).fill(null).map((_, i) => <ProductSkeleton key={i} />)
            : hot.data?.products?.slice(0, 10).map((p) => <ProductCard key={p.slug} product={p} />)
          }
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2 text-center">WHY CHOOSE TMAKER?</h2>
          <p className="text-gray-400 text-center mb-10">Everything you need, from design to delivery.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {WHY_US.map((w) => (
              <div key={w.title} className="border border-gray-700 p-5 hover:border-[#D31F26] transition-colors">
                <div className="w-2 h-6 bg-[#D31F26] mb-3" />
                <h3 className="font-bold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-gray-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-bold text-gray-400 text-center mb-6 tracking-widest uppercase">Trusted by Malaysia's Leading Brands</p>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {CLIENTS.map((c) => (
              <div key={c} className="px-4 py-2 border border-gray-200 text-sm font-black text-gray-400 hover:text-[#D31F26] hover:border-[#D31F26] transition-colors cursor-default">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#D31F26] text-white py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Ready to create your custom apparel?</h2>
          <p className="text-red-200 mb-8">From concept to delivery — our team handles everything. No design experience needed.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/create-your-design" className="bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors">
              CREATE YOUR DESIGN
            </Link>
            <Link href="/shop" className="border-2 border-white text-white font-black px-8 py-3 hover:bg-white hover:text-[#D31F26] transition-colors">
              BROWSE PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
