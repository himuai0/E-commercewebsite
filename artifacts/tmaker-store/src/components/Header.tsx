import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, User, Heart, ChevronDown, Menu, X } from "lucide-react";
import { useListCategories } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import type { Category } from "@workspace/api-client-react";

const NAV_LINKS = [
  { label: "CUSTOM MADE", href: "/custom-made" },
  { label: "EVENT GIFT", href: "/corporate-solutions" },
  { label: "READY MADE", href: "/ready-made" },
  { label: "DESIGN BANK", href: "/create-your-design" },
  { label: "DESIGN STUDIO", href: "/create-your-design" },
  {
    label: "PRINT METHODS", href: "#", sub: [
      { label: "Sublimation", href: "/sublimation" },
      { label: "Direct-to-Film (DTF)", href: "/direct-to-film-dtf" },
      { label: "Embroidery", href: "/shop" },
      { label: "Silkscreen", href: "/shop" },
      { label: "Bulk T-Shirt Printing", href: "/bulk-t-shirt-printing-malaysia" },
      { label: "Custom T-Shirt Printing", href: "/custom-t-shirt-printing-malaysia" },
    ],
  },
  {
    label: "CATALOGUES", href: "#", sub: [
      { label: "Catalogues by TMaker", href: "/catalogues-by-tmaker" },
      { label: "Catalogue by Brands", href: "/catalogue-by-brands" },
    ],
  },
  { label: "PORTFOLIOS", href: "/shop" },
];

function CategoryMegaMenu({ categories }: { categories: Category[] }) {
  return (
    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl z-50 min-w-[560px] grid grid-cols-3 gap-4 p-6">
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
      <div className="bg-[#D31F26] text-white text-xs py-1.5 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="shrink-0">
              Join TMAKER Member &nbsp;•&nbsp; Free Sign Up &nbsp;•&nbsp; 500 Welcome Points (RM5) &nbsp;•&nbsp; Earn Points Every Purchase &nbsp;•&nbsp; Enjoy 5% Lifetime Discount &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Utility bar — matches real site: ABOUT US | CONTACT US | GET A QUOTE | FIND A STORE + icons */}
      <div className="bg-white border-b border-gray-100 text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex gap-5">
          <Link href="/corporate-solutions" className="text-gray-600 hover:text-[#D31F26] font-medium uppercase tracking-wide">About Us</Link>
          <Link href="/custom-made#quote" className="text-gray-600 hover:text-[#D31F26] font-medium uppercase tracking-wide">Contact Us</Link>
          <Link href="/custom-made#quote" className="text-gray-600 hover:text-[#D31F26] font-medium uppercase tracking-wide">Get A Quote</Link>
          <Link href="/user-guide" className="text-gray-600 hover:text-[#D31F26] font-medium uppercase tracking-wide">Find a Store</Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-[#D31F26]" aria-label="Wishlist">
            <Heart className="w-4 h-4" />
          </button>
          <Link href="/cart" className="relative text-gray-500 hover:text-[#D31F26]" data-testid="link-cart-utility">
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D31F26] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button className="text-gray-500 hover:text-[#D31F26]" aria-label="Account">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center gap-4 h-[60px]">
          {/* Logo — matches tmaker.my: t-shirt icon + TMAKER text */}
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-2" data-testid="link-logo">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 60 60" className="w-10 h-10">
                <path d="M5 15 L15 8 L22 14 L22 12 L38 12 L38 14 L45 8 L55 15 L48 22 L42 18 L42 50 L18 50 L18 18 L12 22 Z" fill="#D31F26"/>
                <path d="M22 12 L38 12 L38 14 L22 14 Z" fill="#b81a1f"/>
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight text-gray-800 leading-none">TMAKER</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0 flex-1 overflow-hidden">
            {/* Shop with mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setShopHover(true)}
              onMouseLeave={() => setShopHover(false)}
            >
              <Link href="/shop" className="flex items-center gap-0.5 px-2.5 py-5 text-xs font-bold text-gray-700 hover:text-[#D31F26] whitespace-nowrap tracking-wide">
                SHOP <ChevronDown className="w-3 h-3 mt-0.5" />
              </Link>
              {shopHover && apparelChildren.length > 0 && (
                <CategoryMegaMenu categories={apparelChildren} />
              )}
            </div>

            {NAV_LINKS.map((link) =>
              link.sub ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-0.5 px-2.5 py-5 text-xs font-bold text-gray-700 hover:text-[#D31F26] whitespace-nowrap tracking-wide">
                    {link.label} <ChevronDown className="w-3 h-3 mt-0.5" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg z-50 hidden group-hover:block min-w-[200px]">
                    {link.sub.map((s) => (
                      <Link key={s.label} href={s.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D31F26]">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="px-2.5 py-5 text-xs font-bold text-gray-700 hover:text-[#D31F26] whitespace-nowrap tracking-wide">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center ml-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-52 lg:w-64 border border-gray-300 text-sm px-3 py-1.5 pr-9 focus:outline-none focus:border-[#D31F26] rounded-sm"
                data-testid="input-search"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D31F26]">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Mobile menu button */}
          <button className="xl:hidden ml-auto text-gray-700" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white px-4 py-3">
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
            <Link href="/shop" className="block py-2 text-sm font-semibold text-gray-700 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Shop All</Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.sub ? link.sub[0].href : link.href}
                className="block py-2 text-sm font-semibold text-gray-700 border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
