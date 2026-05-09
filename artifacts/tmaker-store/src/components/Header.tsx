import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, User, Heart, ChevronDown, Menu, X } from "lucide-react";
import { useListCategories } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import type { Category } from "@workspace/api-client-react";

const NAV_LINKS = [
  { label: "CUSTOM MADE", href: "/custom-made" },
  { label: "READY MADE", href: "/ready-made" },
  { label: "PRINT METHODS", href: "#", sub: [
    { label: "Sublimation", href: "/sublimation" },
    { label: "Direct-to-Film (DTF)", href: "/direct-to-film-dtf" },
    { label: "Embroidery", href: "/shop" },
    { label: "Silkscreen", href: "/shop" },
  ]},
  { label: "CATALOGUES", href: "#", sub: [
    { label: "Catalogues by TMaker", href: "/catalogues-by-tmaker" },
    { label: "Catalogue by Brands", href: "/catalogue-by-brands" },
  ]},
  { label: "CORPORATE", href: "/corporate-solutions" },
  { label: "BULK PRINTING", href: "/bulk-t-shirt-printing-malaysia" },
  { label: "AI GENERATOR", href: "/ai-generator" },
];

function CategoryMegaMenu({ categories }: { categories: Category[] }) {
  return (
    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl z-50 min-w-[600px] grid grid-cols-3 gap-4 p-6">
      {categories.map((cat) => (
        <div key={cat.slug}>
          <Link href={`/product-category/${cat.slug}`} className="font-semibold text-sm text-gray-800 hover:text-[#D31F26] block mb-2">
            {cat.name}
          </Link>
          {cat.children?.map((child) => (
            <Link key={child.slug} href={`/product-category/${child.slug}`} className="block text-sm text-gray-500 hover:text-[#D31F26] py-0.5 pl-2">
              {child.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopHover, setShopHover] = useState(false);
  const [, setLocation] = useLocation();
  const { totalItems } = useCart();
  const categoriesData = useListCategories();

  const apparel = categoriesData.data?.categories?.find((c: Category) => c.slug === "apparel");
  const apparelChildren = apparel?.children || [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Ticker */}
      <div className="bg-[#D31F26] text-white text-xs py-2 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="shrink-0">
              Join TMaker Member &nbsp;•&nbsp; Free Sign Up &nbsp;•&nbsp; 500 Welcome Points (RM5) &nbsp;•&nbsp; Earn Points Every Purchase &nbsp;•&nbsp; Enjoy 5% Lifetime Discount &nbsp;•&nbsp; Free Delivery Above RM500 &nbsp;•&nbsp; 7–14 Working Days Turnaround
            </span>
          ))}
        </div>
      </div>

      {/* Utility bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/corporate-solutions" className="hover:text-[#D31F26]">Corporate</Link>
          <Link href="/user-guide" className="hover:text-[#D31F26]">User Guide</Link>
          <a href="tel:+60112345678" className="hover:text-[#D31F26]">+601X-XXXXXXX</a>
        </div>
        <div className="flex gap-4">
          <a href="https://wa.me/601123456789" className="hover:text-[#D31F26]">WhatsApp Us</a>
          <Link href="/custom-made#quote" className="hover:text-[#D31F26]">Get A Quote</Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="w-9 h-9 bg-[#D31F26] flex items-center justify-center rounded-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 2L4 6v3h1v9h14V9h1V6L12 2zM8 18V9h8v9H8z"/>
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900">TMAKER</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 flex-1">
            {/* Shop with mega menu */}
            <div
              className="relative group"
              onMouseEnter={() => setShopHover(true)}
              onMouseLeave={() => setShopHover(false)}
            >
              <Link href="/shop" className="flex items-center gap-1 px-3 py-5 text-sm font-semibold text-gray-700 hover:text-[#D31F26] whitespace-nowrap">
                SHOP <ChevronDown className="w-3 h-3" />
              </Link>
              {shopHover && apparelChildren.length > 0 && (
                <CategoryMegaMenu categories={apparelChildren} />
              )}
            </div>

            {NAV_LINKS.map((link) =>
              link.sub ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-5 text-sm font-semibold text-gray-700 hover:text-[#D31F26] whitespace-nowrap">
                    {link.label} <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg z-50 hidden group-hover:block min-w-[180px]">
                    {link.sub.map((s) => (
                      <Link key={s.label} href={s.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D31F26]">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="px-3 py-5 text-sm font-semibold text-gray-700 hover:text-[#D31F26] whitespace-nowrap">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center ml-auto flex-1 max-w-xs">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 text-sm px-3 py-2 pr-9 focus:outline-none focus:border-[#D31F26]"
                data-testid="input-search"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D31F26]">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-3 ml-2 shrink-0">
            <button className="hidden md:block text-gray-600 hover:text-[#D31F26]" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative text-gray-600 hover:text-[#D31F26]" data-testid="link-cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D31F26] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button className="hidden md:block text-gray-600 hover:text-[#D31F26]" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button className="lg:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3">
            <form onSubmit={handleSearch} className="flex mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#D31F26]"
              />
              <button type="submit" className="bg-[#D31F26] text-white px-3">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <Link href="/shop" className="block py-2 text-sm font-semibold text-gray-700" onClick={() => setMobileOpen(false)}>Shop All</Link>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.sub ? link.sub[0].href : link.href} className="block py-2 text-sm font-semibold text-gray-700" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
