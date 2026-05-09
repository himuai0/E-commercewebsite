import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const PROS = [
  "Unlimited colours — full photographic quality",
  "No cracking, peeling, or fading — ink fused into fabric",
  "All-over printing — no white edges or borders",
  "Lightweight, breathable polyester fabric",
  "Washable up to 60°C without colour loss",
  "Ideal for sportswear, jerseys, and activewear",
];

const FAQ = [
  { q: "What fabric is required for sublimation?", a: "Sublimation works best on 100% polyester or high-polyester blend fabrics. Cotton garments are not compatible." },
  { q: "What is the minimum order?", a: "Minimum 50 pieces per design for sublimation printing orders." },
  { q: "How long does sublimation printing take?", a: "7–14 working days after artwork approval. Rush orders may be available — contact us to check." },
  { q: "Can I print my own design?", a: "Yes! Send us your artwork (AI, PDF, or 300 DPI PNG). Our design team can also help create your artwork." },
];

export default function Sublimation() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Print Method</p>
          <h1 className="text-4xl font-black mb-6">Sublimation Printing Malaysia</h1>
          <p className="text-gray-400 text-lg mb-8">
            All-over full-colour printing fused permanently into the fabric. Perfect for sportswear, jerseys, and vivid branded apparel that demands attention.
          </p>
          <Link href="/custom-made#quote" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            GET A SUBLIMATION QUOTE
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">WHY SUBLIMATION?</h2>
            <ul className="space-y-3">
              {PROS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#D31F26] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 aspect-square overflow-hidden">
            <img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop" alt="Sublimation printing" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-sm text-gray-500">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#D31F26] text-white py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-4">Ready to Print in Full Colour?</h2>
          <p className="text-red-200 mb-6">Get a free quote for your sublimation order — artwork consultation included.</p>
          <Link href="/custom-made#quote" className="inline-block bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors">
            GET A FREE QUOTE
          </Link>
        </div>
      </section>
    </div>
  );
}
