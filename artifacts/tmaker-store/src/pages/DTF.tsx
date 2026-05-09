import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const PROS = [
  "Works on cotton, polyester, nylon, and blended fabrics",
  "Photographic detail with vivid, accurate colours",
  "No minimum order — perfect for 1-piece custom prints",
  "Soft, flexible finish — not stiff like HTV",
  "Full colour with white underbase — works on dark garments",
  "Durable prints — withstands regular washing",
];

export default function DTF() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Print Method</p>
          <h1 className="text-4xl font-black mb-6">Direct-to-Film (DTF) Printing Malaysia</h1>
          <p className="text-gray-400 text-lg mb-8">
            High-detail, full-colour prints on virtually any fabric. No minimums, perfect for detailed logos, photos, and multi-colour artwork on dark and light garments alike.
          </p>
          <Link href="/custom-made#quote" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            GET A DTF QUOTE
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 aspect-square overflow-hidden">
            <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop" alt="DTF printing" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">WHY DTF PRINTING?</h2>
            <ul className="space-y-3">
              {PROS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#D31F26] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[{ v: "No Min", l: "Order Qty" }, { v: "300+ DPI", l: "Print Quality" }, { v: "7–14 Days", l: "Turnaround" }].map((s) => (
                <div key={s.l} className="border border-gray-200 p-3">
                  <div className="text-xl font-black text-[#D31F26]">{s.v}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D31F26] text-white py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-4">Start Your DTF Print Order</h2>
          <p className="text-red-200 mb-6">No minimum order. Upload your artwork and get a quote within hours.</p>
          <Link href="/custom-made#quote" className="inline-block bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors">
            GET A FREE QUOTE
          </Link>
        </div>
      </section>
    </div>
  );
}
