import { Link } from "wouter";

const TIERS = [
  { qty: "50–99 pcs", discount: "Standard Pricing", note: "Base price as listed" },
  { qty: "100–299 pcs", discount: "5–10% Off", note: "Price break on most items" },
  { qty: "300–499 pcs", discount: "10–15% Off", note: "Significant savings" },
  { qty: "500–999 pcs", discount: "15–20% Off", note: "Factory pricing rates" },
  { qty: "1,000+ pcs", discount: "20–30% Off", note: "Custom quote — contact us" },
];

export default function BulkPrinting() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Bulk T-Shirt Printing</p>
          <h1 className="text-4xl font-black mb-6">Bulk T-Shirt Printing Malaysia — The More You Order, The Less You Pay.</h1>
          <p className="text-gray-400 text-lg mb-8">From 50 to 50,000 pieces — we handle every scale with the same commitment to quality and turnaround time.</p>
          <Link href="/custom-made#quote" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            GET BULK PRICING
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">BULK PRICING TIERS</h2>
        <p className="text-gray-500 text-center mb-8">Prices drop as quantity increases. Contact us for exact pricing based on your product selection.</p>
        <div className="border border-gray-200 divide-y divide-gray-100">
          {TIERS.map((t) => (
            <div key={t.qty} className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="font-black text-gray-900">{t.qty}</span>
              <span className="font-bold text-[#D31F26]">{t.discount}</span>
              <span className="text-sm text-gray-500">{t.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#D31F26] text-white py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-4">Need a Bulk Order Quote?</h2>
          <p className="text-red-200 mb-6">Tell us your quantity, garment type, and print design. We'll come back with the best price in Malaysia.</p>
          <Link href="/custom-made#quote" className="inline-block bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors">
            GET BULK QUOTE
          </Link>
        </div>
      </section>
    </div>
  );
}
