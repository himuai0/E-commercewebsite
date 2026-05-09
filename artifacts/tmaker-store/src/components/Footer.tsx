import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#D31F26] flex items-center justify-center rounded-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2L4 6v3h1v9h14V9h1V6L12 2zM8 18V9h8v9H8z"/>
              </svg>
            </div>
            <span className="font-black text-lg text-white tracking-tight">NASHAH ADVISORY</span>
          </div>
          <p className="text-xs leading-relaxed mb-4">
            Malaysia's trusted custom apparel and printing specialist. We help brands, companies, and individuals create high-quality custom clothing with fast turnaround.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#D31F26] flex items-center justify-center rounded-sm transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#D31F26] flex items-center justify-center rounded-sm transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="none" stroke="white" strokeWidth="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line fill="none" stroke="white" strokeWidth="2" x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/60183652033" className="w-8 h-8 bg-gray-700 hover:bg-[#25D366] flex items-center justify-center rounded-sm transition-colors" aria-label="WhatsApp">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Shop All", href: "/shop" },
              { label: "Custom Made", href: "/custom-made" },
              { label: "Ready Made", href: "/ready-made" },
              { label: "Corporate Solutions", href: "/corporate-solutions" },
              { label: "User Guide", href: "/user-guide" },
              { label: "AI Generator", href: "/ai-generator" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#D31F26] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Print Methods */}
        <div>
          <h4 className="font-bold text-white mb-4">Print Methods</h4>
          <ul className="space-y-2">
            {[
              { label: "Sublimation Printing", href: "/sublimation" },
              { label: "Direct-to-Film (DTF)", href: "/direct-to-film-dtf" },
              { label: "Bulk T-Shirt Printing", href: "/bulk-t-shirt-printing-malaysia" },
              { label: "Custom T-Shirt Printing", href: "/custom-t-shirt-printing-malaysia" },
              { label: "Catalogues", href: "/catalogues-by-tmaker" },
              { label: "Catalogue by Brands", href: "/catalogue-by-brands" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#D31F26] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-4">Contact Us</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex gap-2">
              <span className="text-[#D31F26]">+</span>
              <a href="https://wa.me/60183652033" className="hover:text-white transition-colors">+60 18-365 2033 (WhatsApp)</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#D31F26]">@</span>
              <a href="mailto:support@NashahAdvisory.com" className="hover:text-white transition-colors">support@NashahAdvisory.com</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#D31F26]">•</span>
              <span>Mon–Fri: 9:00AM – 6:00PM</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-[#D31F26] shrink-0">•</span>
              <span>NO 13B-1, Jln 6/8, Tmn Komerstal Pandan Indah, 55100 Ampang, Selangor</span>
            </li>
          </ul>
          <Link href="/custom-made#quote" className="mt-4 inline-block bg-[#D31F26] text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition-colors">
            GET A QUOTE
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-xs py-4 px-4">
        <p>© {new Date().getFullYear()} Nashah Advisory. All rights reserved. | NashahAdvisory.com | Custom Apparel Printing Malaysia</p>
      </div>
    </footer>
  );
}
