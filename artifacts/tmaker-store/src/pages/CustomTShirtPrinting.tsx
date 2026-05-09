import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const USES = [
  "Corporate events and roadshows",
  "School activities and sports days",
  "University orientation and clubs",
  "Family day and team building",
  "Band and music merchandise",
  "NGO and community organisations",
  "Restaurant and retail staff uniforms",
  "Marathon and sports events",
];

export default function CustomTShirtPrinting() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Custom T-Shirt Printing</p>
          <h1 className="text-4xl font-black mb-6">Custom T-Shirt Printing Malaysia — Your Brand on Premium Garments.</h1>
          <p className="text-gray-400 text-lg mb-8">Upload your logo or artwork and we'll print it on Malaysia's best-selling blank t-shirts. Six print methods, any quantity, fast delivery.</p>
          <Link href="/shop?category=t-shirt-unisex-men" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            BROWSE T-SHIRTS
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">PERFECT FOR ANY OCCASION</h2>
            <div className="grid grid-cols-2 gap-2">
              {USES.map((u) => (
                <div key={u} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 text-[#D31F26] shrink-0" />
                  {u}
                </div>
              ))}
            </div>
            <Link href="/custom-made#quote" className="inline-block mt-8 bg-[#D31F26] text-white font-black px-6 py-3 hover:bg-red-700 transition-colors">
              GET A QUOTE NOW
            </Link>
          </div>
          <div className="bg-gray-100 aspect-square overflow-hidden">
            <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop" alt="Custom t-shirt printing" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-8">WHY TMAKER FOR CUSTOM T-SHIRT PRINTING?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "6", l: "Print Methods" },
              { v: "500+", l: "Garment Styles" },
              { v: "7–14", l: "Days Turnaround" },
              { v: "Free", l: "Design Mockup" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-gray-200 p-5 text-center">
                <div className="text-3xl font-black text-[#D31F26]">{s.v}</div>
                <div className="text-sm text-gray-500 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
