import { Link } from "wouter";

const BEST_FOR = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
    title: "Event T-Shirts",
    desc: "For roadshows, conferences, launches, campaigns, sports days and volunteer teams.",
    href: "/event-merchandise-gift-malaysia",
  },
  {
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop",
    title: "Corporate Shirts",
    desc: "For company teams, sales staff, uniforms, HR activities and brand visibility.",
    href: "/corporate-solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    title: "Round Neck T-Shirts",
    desc: "For bulk orders, giveaways, casual uniforms, schools, clubs and campaigns.",
    href: "/product-category/unisex-men",
  },
  {
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
    title: "Bulk Orders",
    desc: "For businesses and organisers that need consistent sizing, artwork and delivery planning.",
    href: "/bulk-t-shirt-printing-malaysia",
  },
];

const RELATED_SERVICES = [
  { title: "Bulk T-Shirt Printing", desc: "Bulk orders for companies, schools and events.", href: "/bulk-t-shirt-printing-malaysia" },
  { title: "Custom Made Apparel", desc: "Custom apparel for teams, events and organisations.", href: "/custom-made" },
  { title: "Corporate Solutions", desc: "Apparel and merchandise for your company.", href: "/corporate-solutions" },
  { title: "Custom Jacket", desc: "Varsity jackets, windbreakers and corporate jackets.", href: "/custom-made" },
  { title: "DTF Printing", desc: "Good for colourful designs, names and flexible quantities.", href: "/direct-to-film-dtf" },
  { title: "Silkscreen Printing", desc: "Best for bigger quantities and strong solid colours.", href: "/custom-made" },
];

export default function CustomTShirtPrinting() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#D31F26]">Home</Link>
          <span className="mx-2">»</span>
          <span className="text-gray-800">Custom T-Shirt Printing Malaysia | TMaker</span>
        </div>
      </div>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">T-Shirt Printing Malaysia</p>
            <h1 className="text-3xl font-black text-gray-900 mb-5 leading-snug">Custom T-Shirt Printing Malaysia</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-7">
              TMaker helps companies, events, schools, clubs and brands produce custom T-shirts in Malaysia with professional printing,
              bulk order support and practical product recommendations. Choose round neck T-shirts, polo shirts, oversized T-shirts,
              performance shirts and ready-made options, then customise with DTF, silkscreen, embroidery, sublimation or heat press
              depending on your design and quantity.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20custom%20T-shirt%20printing%20quote."
                className="bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
              >
                Get T-Shirt Printing Quote
              </a>
              <Link
                href="/shop"
                className="border border-gray-400 text-gray-700 font-semibold px-6 py-2.5 text-sm hover:border-gray-700 transition-colors"
              >
                Browse T-Shirt Catalogue
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded overflow-hidden flex items-center justify-center min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop"
              alt="Custom T-shirt printing Malaysia by TMaker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Best For section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Best For</p>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Custom T-Shirts For Companies, Events And Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BEST_FOR.map((item) => (
              <Link key={item.title} href={item.href} className="block bg-white border border-gray-200 hover:border-[#D31F26] transition-colors group">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Printing methods */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Methods</p>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Choose The Right Printing Method</h2>
        <ul className="space-y-3 text-sm text-gray-700 max-w-2xl">
          <li><span className="font-bold text-gray-900">DTF Printing:</span> good for colourful designs, names, numbers and flexible quantities.</li>
          <li><span className="font-bold text-gray-900">Silkscreen:</span> good for larger bulk T-shirt orders with simple artwork and strong colours.</li>
          <li><span className="font-bold text-gray-900">Embroidery:</span> good for premium logos on polo shirts, uniforms, caps and jackets.</li>
          <li><span className="font-bold text-gray-900">Sublimation:</span> good for selected polyester sportswear, jerseys and full-colour designs.</li>
        </ul>
      </section>

      {/* Quote checklist */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Quote Checklist</p>
          <h2 className="text-xl font-black text-gray-900 mb-5">Send These Details</h2>
          <ul className="space-y-2 text-sm text-gray-700 mb-7 max-w-md">
            {[
              "T-shirt type and quantity",
              "Size breakdown and colour preference",
              "Logo, artwork or reference design",
              "Printing position and deadline",
              "Delivery or collection location",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#D31F26] font-black mt-0.5">-</span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20custom%20T-shirt%20printing%20quote.%20Quantity%3A%20__.%20T-shirt%20type%3A%20__.%20Artwork%2Flogo%3A%20__.%20Deadline%3A%20__.%20Delivery%20location%3A%20__."
            className="inline-block bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
          >
            Request Quote
          </a>
        </div>
      </section>

      {/* Related services */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Related Services</p>
        <h2 className="text-2xl font-black text-gray-900 mb-7">Plan Your Complete Custom Apparel Order</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {RELATED_SERVICES.map((svc) => (
            <Link
              key={svc.title}
              href={svc.href}
              className="block border border-gray-200 p-4 hover:border-[#D31F26] transition-colors group"
            >
              <p className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#D31F26] transition-colors">{svc.title}</p>
              <p className="text-gray-500 text-xs">{svc.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-6">
          <span className="font-bold">Need jackets too?</span> TMaker also supports custom jacket printing in Malaysia for corporate jackets, windbreakers, event jackets, Bomba jackets and technician jackets.
        </p>
      </section>

      {/* Info sections */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">What To Know Before Ordering Custom T-Shirts In Malaysia</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl leading-relaxed">
            Before ordering custom T-shirts, decide how the shirts will be used. Event shirts usually need clear artwork, visible branding and a confirmed deadline.
            Company shirts may need a more professional material, consistent sizing and logo placement. School, club and team orders often need names, numbers, colour options and size planning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "For Companies", text: "Choose polo shirts, round neck T-shirts or uniforms depending on staff usage and brand image." },
              { label: "For Events", text: "Choose comfortable T-shirts with clear branding and plan production time before the event date." },
              { label: "For Bulk Orders", text: "Confirm quantity, size breakdown and artwork early so quotation and production can move faster." },
              { label: "For Printing Method", text: "Use DTF for colourful artwork, silkscreen for larger simple designs, and embroidery for premium logos." },
            ].map((item) => (
              <div key={item.label} className="bg-white p-4 border border-gray-200">
                <p className="font-bold text-gray-900 text-sm mb-2">{item.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast quote CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Fast Quote Path</p>
        <h2 className="text-2xl font-black text-gray-900 mb-3">Need Custom T-Shirts Fast?</h2>
        <p className="text-sm text-gray-600 mb-7 max-w-xl">
          Send your T-shirt type, quantity, artwork, deadline and delivery location. TMaker can advise the suitable shirt, printing method and next quote step.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20custom%20T-shirt%20printing%20quote.%20Quantity%3A%20__.%20T-shirt%20type%3A%20__.%20Artwork%2Flogo%3A%20__.%20Deadline%3A%20__.%20Delivery%20location%3A%20__."
            className="bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
          >
            WhatsApp Custom T-Shirt Printing
          </a>
          <Link
            href="/get-a-quote"
            className="border border-gray-400 text-gray-700 font-semibold px-6 py-2.5 text-sm hover:border-gray-700 transition-colors"
          >
            Get Formal Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
