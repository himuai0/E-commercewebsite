import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "Choose Your Product", desc: "Browse our catalogue of 500+ apparel styles — t-shirts, polos, uniforms, hoodies, jackets, and more." },
  { num: "02", title: "Send Us Your Design", desc: "Share your logo, artwork, or concept. Our design team will create a mockup at no charge." },
  { num: "03", title: "Review & Approve", desc: "We send you a colour proof for approval. No production starts until you're 100% satisfied." },
  { num: "04", title: "Production", desc: "Once approved, our factory produces your order with quality checks at every stage." },
  { num: "05", title: "Quality Control", desc: "Each garment is inspected for print quality, sizing, and finish before packing." },
  { num: "06", title: "Delivery", desc: "Your order ships within 7–14 working days. Nationwide delivery across Malaysia." },
];

const FEATURES = [
  "Minimum 50 pieces per colour",
  "Free design consultation",
  "Free colour mockup before production",
  "Pantone colour matching available",
  "100% quality guarantee",
  "Bulk pricing — the more you order, the less you pay",
  "Corporate invoice available",
  "WhatsApp support 9AM–6PM",
];

const PRINT_METHODS = [
  { name: "Embroidery", best: "Polo shirts, caps, corporate uniforms", min: "50 pcs" },
  { name: "Silkscreen", best: "T-shirts, large batch orders", min: "100 pcs" },
  { name: "Heat Press", best: "Small batches, photos, gradients", min: "1 pc" },
  { name: "Direct-to-Film (DTF)", best: "All fabrics, detailed artwork", min: "1 pc" },
  { name: "Sublimation", best: "Sportswear, all-over prints", min: "50 pcs" },
  { name: "Direct-to-Garment (DTG)", best: "Cotton, retail-quality prints", min: "1 pc" },
];

export default function CustomMade() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Custom Made Apparel</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">From Idea to Delivery,<br />We Handle Everything.</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Malaysia's most trusted custom apparel partner. Brands, event organizers, schools, and corporations — we've got you covered.
          </p>
          <a href="#quote" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors" data-testid="button-get-quote-hero">
            GET A FREE QUOTE
          </a>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">HOW IT WORKS</h2>
        <p className="text-gray-500 text-center mb-10">Our streamlined 6-step process keeps you in control every step of the way.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="border border-gray-200 p-6 hover:border-[#D31F26] transition-colors group">
              <div className="text-3xl font-black text-[#D31F26] mb-3">{step.num}</div>
              <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#D31F26] transition-colors">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Print methods */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">PRINTING METHODS</h2>
          <p className="text-gray-500 text-center mb-10">We support six industry-leading print technologies — we'll recommend the best one for your project.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PRINT_METHODS.map((m) => (
              <div key={m.name} className="bg-white border border-gray-200 p-5">
                <div className="w-2 h-5 bg-[#D31F26] mb-3" />
                <h3 className="font-black text-gray-900 mb-2">{m.name}</h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p><span className="font-semibold text-gray-700">Best for:</span> {m.best}</p>
                  <p><span className="font-semibold text-gray-700">Min order:</span> {m.min}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">WHY CUSTOM MADE WITH TMAKER?</h2>
            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#D31F26] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/shop" className="inline-flex items-center gap-2 mt-8 bg-black text-white font-black px-6 py-3 hover:bg-gray-800 transition-colors">
              BROWSE PRODUCTS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-gray-100 aspect-video overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
              alt="Custom apparel manufacturing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section id="quote" className="bg-[#D31F26] text-white py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Ready to Start Your Custom Order?</h2>
          <p className="text-red-200 mb-8">Contact us via WhatsApp for the fastest response. Our team will get back to you within 2 hours during business hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/601123456789?text=Hi+TMaker%2C+I%27m+interested+in+a+custom+apparel+order."
              className="bg-white text-[#D31F26] font-black px-8 py-3 hover:bg-gray-100 transition-colors"
              data-testid="button-whatsapp"
            >
              WHATSAPP US NOW
            </a>
            <a href="mailto:hello@tmaker.my" className="border-2 border-white text-white font-black px-8 py-3 hover:bg-white hover:text-[#D31F26] transition-colors">
              EMAIL US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
