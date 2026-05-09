import { Link } from "wouter";

const BULK_BUYERS = [
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop",
    title: "Companies",
    desc: "For staff uniforms, campaigns, HR events, onboarding packs and corporate activities.",
    href: "/corporate-solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
    title: "Event Organisers",
    desc: "For conferences, runs, launches, roadshows, volunteers and crew apparel.",
    href: "/event-merchandise-gift-malaysia",
  },
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    title: "Schools & Clubs",
    desc: "For societies, camps, sports days, graduations, trips and club identity.",
    href: "/custom-t-shirt-printing-malaysia",
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
    title: "Agencies & Brands",
    desc: "For promotional campaigns, merchandise drops, giveaways and client projects.",
    href: "/get-a-quote",
  },
];

const COMPARE_SERVICES = [
  { title: "Custom T-Shirt Printing", desc: "Company shirts, event T-shirts and apparel printing.", href: "/custom-t-shirt-printing-malaysia" },
  { title: "Silkscreen Printing", desc: "Best for bigger quantities and strong solid colours.", href: "/custom-made" },
  { title: "DTF Printing", desc: "Good for colourful designs, names and flexible quantities.", href: "/direct-to-film-dtf" },
  { title: "Embroidery", desc: "Premium stitched logos for uniforms, caps and jackets.", href: "/custom-made" },
  { title: "Event Merchandise", desc: "Event shirts, caps, lanyards, bags and gift packs.", href: "/event-merchandise-gift-malaysia" },
  { title: "Corporate Solutions", desc: "Apparel and merchandise planning for your company.", href: "/corporate-solutions" },
];

export default function BulkPrinting() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#D31F26]">Home</Link>
          <span className="mx-2">»</span>
          <span className="text-gray-800">Bulk T-Shirt Printing Malaysia | TMaker</span>
        </div>
      </div>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Bulk T-Shirt Printing</p>
            <h1 className="text-3xl font-black text-gray-900 mb-5 leading-snug">Bulk T-Shirt Printing Malaysia</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-7">
              TMaker supports bulk T-shirt printing in Malaysia for corporate uniforms, events, campaigns, schools, clubs, agencies and organisations.
              If you need larger quantities with consistent quality, clear artwork approval and deadline planning, TMaker can recommend suitable T-shirt
              options and printing methods based on your budget and timeline.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20bulk%20T-shirt%20printing%20quote.%20Quantity%3A%20__.%20Size%20breakdown%3A%20__.%20Artwork%2Flogo%3A%20__.%20Deadline%3A%20__.%20Delivery%20location%3A%20__."
                className="bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
              >
                Get Bulk T-Shirt Quote
              </a>
              <Link
                href="/custom-t-shirt-printing-malaysia"
                className="border border-gray-400 text-gray-700 font-semibold px-6 py-2.5 text-sm hover:border-gray-700 transition-colors"
              >
                Custom T-Shirt Printing
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded overflow-hidden flex items-center justify-center min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=450&fit=crop"
              alt="Bulk T-shirt printing Malaysia by TMaker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Who orders bulk */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Bulk Buyers</p>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Who Orders Bulk T-Shirts From TMaker?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BULK_BUYERS.map((item) => (
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

      {/* Bulk planning */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Bulk Planning</p>
        <h2 className="text-2xl font-black text-gray-900 mb-6">What Affects Bulk T-Shirt Printing Price?</h2>
        <ul className="space-y-2 text-sm text-gray-700 mb-8 max-w-md">
          {[
            "T-shirt brand, material and size range",
            "Total quantity and number of colours",
            "Printing method and print position",
            "Artwork readiness and design complexity",
            "Deadline, packing and delivery location",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[#D31F26] font-black mt-0.5">-</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-black text-gray-900 mb-3">Printing For Bulk Orders</h3>
        <p className="text-sm text-gray-600 mb-7 max-w-2xl leading-relaxed">
          Silkscreen is often suitable for larger T-shirt quantities with simple artwork. DTF can support colourful designs and smaller batch flexibility.
          Embroidery is usually better for polo shirts, caps and premium uniform logos.
        </p>
        <a
          href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20bulk%20T-shirt%20printing%20quote."
          className="inline-block bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
        >
          Request Bulk Quote
        </a>
      </section>

      {/* Compare your options */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-7">Compare Your Options</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {COMPARE_SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="block border border-gray-200 p-4 bg-white hover:border-[#D31F26] transition-colors group"
              >
                <p className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#D31F26] transition-colors">{svc.title}</p>
                <p className="text-gray-500 text-xs">{svc.desc}</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            <span className="font-bold">Need jackets too?</span> TMaker also supports custom jacket printing in Malaysia for corporate jackets, windbreakers, event jackets, Bomba jackets and technician jackets.
          </p>
        </div>
      </section>

      {/* Planning guide */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-black text-gray-900 mb-5">Bulk T-Shirt Printing Planning Guide</h2>
        <p className="text-sm text-gray-600 mb-6 max-w-3xl leading-relaxed">
          Bulk T-shirt orders need more planning than small orders because size breakdown, artwork approval, packing and delivery timing can affect the whole project.
          The best way to avoid delay is to confirm your quantity, colour, deadline and artwork before requesting final production.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Best For Bulk", text: "Company events, campaign shirts, roadshows, school activities, clubs, teams and large giveaways." },
            { label: "Best Method", text: "Silkscreen is often suitable for larger simple artwork. DTF is useful for colourful and detailed designs." },
            { label: "What To Prepare", text: "Quantity, size list, artwork file, shirt colour, printing position, deadline and delivery location." },
            { label: "How To Save Time", text: "Send your design and quantity early so TMaker can recommend the right shirt and printing method." },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 p-4 border border-gray-200">
              <p className="font-bold text-gray-900 text-sm mb-2">{item.label}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fast quote CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Fast Quote Path</p>
        <h2 className="text-2xl font-black text-gray-900 mb-3">Need A Bulk T-Shirt Quote?</h2>
        <p className="text-sm text-gray-600 mb-7 max-w-xl">
          Share your quantity, size breakdown, shirt colour, artwork and deadline. TMaker can recommend DTF, silkscreen or other suitable options for your bulk order.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://wa.me/60129088654?text=Hi%20TMaker%2C%20I%20need%20a%20bulk%20T-shirt%20printing%20quote.%20Quantity%3A%20__.%20Size%20breakdown%3A%20__.%20Artwork%2Flogo%3A%20__.%20Deadline%3A%20__.%20Delivery%20location%3A%20__."
            className="bg-[#D31F26] text-white font-bold px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
          >
            WhatsApp Bulk T-Shirt Printing
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
