import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const PROCESS_STEPS = [
  "Select Apparel",
  "Add Design (Optional)",
  "Production",
  "Quality Check",
  "Delivery",
];

const SERVICES = [
  {
    title: "Custom T-Shirt Printing",
    desc: "T-shirts, polo shirts and event apparel with printing options.",
    href: "/custom-t-shirt-printing-malaysia",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
  },
  {
    title: "Bulk T-Shirt Printing",
    desc: "Bulk orders for companies, schools, events and clubs.",
    href: "/bulk-t-shirt-printing-malaysia",
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=200&fit=crop",
  },
  {
    title: "Sublimation Printing",
    desc: "All-over full-colour printing fused permanently into polyester fabric.",
    href: "/sublimation",
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=200&fit=crop",
  },
  {
    title: "Direct-to-Film (DTF)",
    desc: "High-detail prints on any fabric with no minimum order.",
    href: "/direct-to-film-dtf",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=200&fit=crop",
  },
  {
    title: "Corporate Solutions",
    desc: "Uniforms, corporate gifts and event merchandise for companies.",
    href: "/corporate-solutions",
    img: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=300&h=200&fit=crop",
  },
  {
    title: "Event Merchandise",
    desc: "Event T-shirts, lanyards, bags, caps, towels and branded gifts.",
    href: "/corporate-solutions",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
];

export default function ReadyMade() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#D31F26]">Home</Link>
        <span className="mx-1">»</span>
        <span className="text-gray-800">Ready Made</span>
      </div>

      {/* Hero — matches real site layout */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Ready Made</h1>
        <p className="text-gray-600 mb-10 text-base leading-relaxed">
          In-stock apparel ready for instant branding. Skip the wait and bring your ideas to life<br />
          with high-speed Heat Press and DTF technology.
        </p>

        {/* Process steps — horizontal arrows */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-2 text-sm font-semibold text-gray-700 flex-wrap">
          {PROCESS_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className={i === 0 ? "text-[#D31F26]" : ""}>{step}</span>
              {i < PROCESS_STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-[#D31F26]" />}
            </span>
          ))}
        </div>

        {/* Process steps — vertical for mobile */}
        <div className="md:hidden flex flex-col items-center gap-1 mb-8 text-sm font-semibold text-gray-700">
          {PROCESS_STEPS.map((step, i) => (
            <span key={step} className="flex flex-col items-center gap-1">
              <span>{step}</span>
              {i < PROCESS_STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-[#D31F26] rotate-90" />}
            </span>
          ))}
        </div>
      </section>

      {/* Two main CTA cards — Browse Catalogues + Design Studio */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Browse Catalogues */}
          <div className="border border-gray-200 p-8 text-center hover:border-[#D31F26] transition-colors group">
            <h2 className="font-black text-lg text-gray-900 mb-3 uppercase tracking-wide">Browse Catalogues</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Explore hundreds of ready stock blanks including T-shirts, Polos, Hoodies, and Corporate wear.
            </p>
            <Link
              href="/shop"
              className="inline-block border-2 border-gray-800 text-gray-800 font-black text-sm px-6 py-2 hover:bg-gray-800 hover:text-white transition-colors"
              data-testid="button-go-to-shop"
            >
              GO TO SHOP
            </Link>
          </div>

          {/* Design Studio */}
          <div className="border border-gray-200 p-8 text-center hover:border-[#D31F26] transition-colors group">
            <h2 className="font-black text-lg text-gray-900 mb-3 uppercase tracking-wide">Design Studio</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Use our online editor to visualise your logo, add text, and create your design in real-time.
            </p>
            <Link
              href="/create-your-design"
              className="inline-block bg-black text-white font-black text-sm px-6 py-2 hover:bg-[#D31F26] transition-colors"
              data-testid="button-start-designing"
            >
              START DESIGNING
            </Link>
          </div>
        </div>
      </section>

      {/* Optimised for Speed */}
      <section className="bg-gray-50 border-y border-gray-200 py-8 text-center">
        <p className="font-black text-gray-800 text-sm uppercase tracking-widest mb-1">Optimised for Speed</p>
        <p className="text-xs text-gray-500 tracking-wider">
          PREMIUM HEAT PRESS &nbsp;·&nbsp; HIGH-DEFINITION DTF &nbsp;·&nbsp; VIBRANT TRANSFERS
        </p>
      </section>

      {/* Popular TMaker Services */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-gray-900 mb-3 text-center">Popular TMaker Services</h2>
        <p className="text-gray-500 text-center mb-10 text-sm max-w-2xl mx-auto">
          Explore the main TMaker services for custom apparel, printing, corporate gifts and event merchandise in Malaysia.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link key={s.title} href={s.href} className="group border border-gray-200 hover:border-[#D31F26] hover:shadow-md transition-all overflow-hidden">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-black text-gray-900 mb-1 group-hover:text-[#D31F26] transition-colors">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D31F26] text-white py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">Ready to Brand Your Apparel?</h2>
          <p className="text-red-200 mb-6 text-sm">Contact us via WhatsApp for the fastest response. Free colour mockup included.</p>
          <a
            href="https://wa.me/601123456789"
            className="inline-block bg-[#FF6B00] text-white font-black px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
            data-testid="button-whatsapp-cta"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
}
