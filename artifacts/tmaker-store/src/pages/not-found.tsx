import { Link } from "wouter";

const QUICK_LINKS = [
  { label: "GET A QUOTE", href: "/custom-made#quote", icon: "✏️" },
  { label: "DESIGN BANK", href: "/create-your-design", icon: "🎨" },
  { label: "CORPORATE SOLUTIONS", href: "/corporate-solutions", icon: "🏢" },
  { label: "OUR WORKS", href: "/shop", icon: "👕" },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Big 404 text in the background style */}
      <div className="relative mb-6">
        <p className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none">404</p>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">🧵</span>
        </div>
      </div>

      <h1 className="text-2xl font-black text-gray-800 mb-3">Oops! Looks like we're out of thread.</h1>
      <p className="text-gray-500 mb-10 max-w-sm">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in our collection.
      </p>

      {/* Quick link cards — matches real 404 page */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-2xl">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="border border-gray-200 p-5 flex flex-col items-center gap-3 hover:border-[#D31F26] hover:shadow-md transition-all group"
          >
            <span className="text-3xl">{l.icon}</span>
            <span className="text-xs font-black text-gray-600 group-hover:text-[#D31F26] transition-colors">{l.label}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="border-2 border-gray-800 text-gray-800 font-black px-10 py-3 hover:bg-gray-800 hover:text-white transition-colors"
        data-testid="button-back-to-homepage"
      >
        BACK TO HOMEPAGE
      </Link>
    </div>
  );
}
