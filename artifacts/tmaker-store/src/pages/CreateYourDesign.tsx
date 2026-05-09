import { Link } from "wouter";

const STEPS = [
  { num: "1", title: "Pick Your Product", desc: "Choose from our range of t-shirts, polos, hoodies, and more." },
  { num: "2", title: "Upload Your Design", desc: "Send us your logo, artwork, or text in AI, PDF, or high-res PNG format." },
  { num: "3", title: "Review Your Mockup", desc: "We'll create a free digital mockup for your approval within 24 hours." },
  { num: "4", title: "Confirm & Produce", desc: "Approve the mockup and we'll start production immediately." },
];

export default function CreateYourDesign() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Design Studio</p>
          <h1 className="text-4xl font-black mb-6">Create Your Custom Design</h1>
          <p className="text-gray-400 text-lg mb-8">No design experience? No problem. Our team helps you create a professional, print-ready design — for free.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/custom-made#quote" className="inline-block bg-[#D31F26] text-white font-black px-8 py-4 hover:bg-red-700 transition-colors">
              START WITH A QUOTE
            </Link>
            <Link href="/ai-generator" className="inline-block border-2 border-white text-white font-black px-8 py-4 hover:bg-white hover:text-gray-900 transition-colors">
              TRY AI GENERATOR
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-900 mb-10 text-center">HOW THE DESIGN PROCESS WORKS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.num} className="text-center border border-gray-200 p-6 hover:border-[#D31F26] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#D31F26] text-white font-black flex items-center justify-center text-lg mx-auto mb-4">{s.num}</div>
              <h3 className="font-black text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-4">ARTWORK REQUIREMENTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { title: "Accepted Formats", items: ["Adobe Illustrator (.AI)", "PDF (vector preferred)", "PNG (min 300 DPI)"] },
              { title: "Colour Mode", items: ["CMYK for offset/silkscreen", "RGB for digital/DTF", "Pantone matching available"] },
              { title: "Requirements", items: ["Outlines for all fonts", "Transparent background for PNG", "Min 300 DPI resolution"] },
            ].map((g) => (
              <div key={g.title} className="bg-white border border-gray-200 p-4">
                <h3 className="font-black text-gray-800 mb-3 text-sm">{g.title}</h3>
                <ul className="space-y-1">
                  {g.items.map((i) => <li key={i} className="text-xs text-gray-500">• {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#D31F26] text-white py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-4">Ready to Create?</h2>
          <p className="text-red-200 mb-6">Submit your brief and get a free design mockup within 24 hours.</p>
          <Link href="/custom-made#quote" className="inline-block bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors">
            GET STARTED FREE
          </Link>
        </div>
      </section>
    </div>
  );
}
