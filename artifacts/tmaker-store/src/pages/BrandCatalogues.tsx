import { Link } from "wouter";

const BRANDS = [
  {
    name: "Gildan",
    desc: "American brand known for premium cotton basics. Gildan 76000, 2000, 63000 — trusted worldwide.",
    products: ["Round Neck T-Shirts", "V-Neck T-Shirts", "Hoodies", "Sweatshirts"],
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
  },
  {
    name: "Oren Sport",
    desc: "Malaysia's favourite local brand. Microfibre, cotton, and performance fabrics for every occasion.",
    products: ["Polo Shirts", "Round Neck T-Shirts", "F1 Uniforms", "Honeycomb Polo"],
    img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=200&fit=crop",
  },
  {
    name: "Crossrunner",
    desc: "Performance activewear brand. Dry-pique fabric for sports events and athletic teams.",
    products: ["Athletic T-Shirts", "Performance Polo", "Sports Jerseys"],
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=200&fit=crop",
  },
  {
    name: "North Harbour",
    desc: "Quality garments with modern silhouettes — popular for oversized tees and streetwear.",
    products: ["Oversized T-Shirts", "Round Neck Tees", "Casual Tops"],
    img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=300&h=200&fit=crop",
  },
  {
    name: "Enzo",
    desc: "Premium Malaysian brand offering microfibre and lacoste polo shirts with vibrant colour options.",
    products: ["Microfibre T-Shirts", "Lacoste Polo", "Standard Polo"],
    img: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=300&h=200&fit=crop",
  },
];

export default function BrandCatalogues() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Brands</p>
          <h1 className="text-4xl font-black mb-6">Catalogue by Brands</h1>
          <p className="text-gray-400 text-lg">We work with Malaysia's most trusted garment brands to bring you quality you can rely on.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="space-y-8">
          {BRANDS.map((b) => (
            <div key={b.name} className="border border-gray-200 hover:border-[#D31F26] transition-colors overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="overflow-hidden bg-gray-100 aspect-video md:aspect-auto">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-6">
                  <h2 className="font-black text-2xl text-gray-900 mb-3">{b.name}</h2>
                  <p className="text-gray-500 text-sm mb-4">{b.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {b.products.map((p) => (
                      <span key={p} className="text-xs border border-gray-300 px-3 py-1 text-gray-600">{p}</span>
                    ))}
                  </div>
                  <Link href={`/shop?brand=${encodeURIComponent(b.name)}`} className="inline-block bg-black text-white font-black text-sm px-5 py-2 hover:bg-[#D31F26] transition-colors">
                    SHOP {b.name.toUpperCase()}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
