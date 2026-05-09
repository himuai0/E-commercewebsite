import { Link } from "wouter";

const STEPS = [
  {
    num: "01", title: "Browse & Select Your Product",
    desc: "Use our shop or category pages to find your ideal garment. Filter by brand, category, price, or use the search bar. Click 'Select Options' on any product to see colours, sizes, and pricing.",
  },
  {
    num: "02", title: "Add to Cart & Specify Quantity",
    desc: "Select your colour and size. Set the quantity (minimum 50 pieces per colour). Add to cart — you can continue shopping and add multiple products.",
  },
  {
    num: "03", title: "Request a Quote",
    desc: "Click 'Proceed to Checkout' or 'Get a Quote'. Share your cart details via WhatsApp or email. Include your artwork/logo if you have one.",
  },
  {
    num: "04", title: "Receive Design Mockup",
    desc: "Our design team creates a free digital mockup within 24 hours showing your design on the chosen garment(s). Review and request revisions — unlimited until you're happy.",
  },
  {
    num: "05", title: "Confirm & Make Payment",
    desc: "Approve your mockup and confirm your order. We accept bank transfer, online banking (FPX), and credit card. 50% deposit required to start production.",
  },
  {
    num: "06", title: "Production & Delivery",
    desc: "Once payment is confirmed, production begins. Your order ships within 7–14 working days. Track your order status via WhatsApp updates from your account manager.",
  },
];

export default function UserGuide() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">How It Works</p>
          <h1 className="text-4xl font-black mb-6">User Guide</h1>
          <p className="text-gray-400 text-lg">A step-by-step guide to ordering custom apparel with Nashah Advisory — fast, simple, and hassle-free.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex gap-6 border border-gray-200 p-6 hover:border-[#D31F26] transition-colors">
              <div className="shrink-0 w-12 h-12 bg-[#D31F26] text-white font-black flex items-center justify-center text-lg">{s.num}</div>
              <div>
                <h3 className="font-black text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-8">STILL HAVE QUESTIONS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://wa.me/60183652033" className="bg-[#D31F26] text-white font-black px-6 py-4 hover:bg-red-700 transition-colors block">
              CHAT ON WHATSAPP
            </a>
            <Link href="/custom-made#quote" className="border-2 border-gray-800 text-gray-800 font-black px-6 py-4 hover:bg-gray-800 hover:text-white transition-colors block">
              SUBMIT A BRIEF
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
