import { Link } from "wouter";
import { CheckCircle, Building2, Users, Award, Clock } from "lucide-react";

const SERVICES = [
  { icon: Building2, title: "Corporate Uniforms", desc: "Polo shirts, F1 uniforms, dress shirts — customised with your logo and branding for your entire team." },
  { icon: Users, title: "Event & Conference Apparel", desc: "From 50 to 50,000 pieces — perfect for annual dinners, team building, roadshows, and trade shows." },
  { icon: Award, title: "Branded Merchandise", desc: "T-shirts, tote bags, caps, lanyards — complete merchandising solutions for your brand." },
  { icon: Clock, title: "Rush Order Service", desc: "Need it fast? Our rush production ensures your order is ready in time, even on tight deadlines." },
];

const CLIENTS = ["PETRONAS", "CELCOM", "MAXIS", "DIGI", "CIMB", "MAYBANK", "GENTING", "AIA", "PRUDENTIAL", "NESTLE", "UNILEVER", "GRAB", "SHOPEE", "LAZADA", "AIROD", "HONDA"];

const BENEFITS = [
  "Dedicated account manager for corporate clients",
  "Net-30 payment terms for approved companies",
  "Corporate invoice with SST registration",
  "Bulk pricing with volume discounts",
  "Free delivery for orders above RM2,000",
  "Priority production for repeat orders",
  "Exclusive brand mockup within 24 hours",
  "Samples available before bulk production",
];

export default function CorporateSolutions() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#D31F26] font-bold text-sm tracking-widest mb-3 uppercase">Corporate Solutions</p>
          <h1 className="text-4xl font-black mb-6">Dress Your Team.<br />Represent Your Brand.</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            From small SMEs to Fortune 500 companies — TMaker is Malaysia's corporate apparel partner of choice. Bulk orders, dedicated support, and guaranteed quality.
          </p>
          <Link href="/custom-made#quote" className="inline-block bg-[#D31F26] text-white font-black px-10 py-4 hover:bg-red-700 transition-colors">
            GET CORPORATE PRICING
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">CORPORATE SERVICES</h2>
        <p className="text-gray-500 text-center mb-10">Everything your company needs for branded apparel and merchandise.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-gray-200 p-6 hover:border-[#D31F26] transition-colors group">
              <s.icon className="w-8 h-8 text-[#D31F26] mb-4" />
              <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#D31F26] transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">CORPORATE BENEFITS</h2>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#D31F26] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-200 aspect-video overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Corporate team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#D31F26] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "500+", l: "Corporate Clients" },
            { v: "1M+", l: "Pieces Produced" },
            { v: "10+", l: "Years Experience" },
            { v: "99%", l: "Satisfaction Rate" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-black">{s.v}</div>
              <div className="text-red-200 text-sm mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted clients */}
      <section className="max-w-6xl mx-auto px-4 py-14 text-center">
        <h2 className="text-xl font-black text-gray-900 mb-6">TRUSTED BY MALAYSIA'S LEADING COMPANIES</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {CLIENTS.map((c) => (
            <div key={c} className="border border-gray-200 px-4 py-2 text-sm font-black text-gray-400 hover:border-[#D31F26] hover:text-[#D31F26] transition-colors">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-4">Ready to Dress Your Team?</h2>
          <p className="text-gray-400 mb-8">Contact our corporate team today. We'll prepare a custom quote within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/601123456789" className="bg-[#D31F26] text-white font-black px-8 py-3 hover:bg-red-700 transition-colors">
              WHATSAPP CORPORATE TEAM
            </a>
            <Link href="/custom-made#quote" className="border border-gray-500 text-white font-black px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors">
              SUBMIT BRIEF
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
