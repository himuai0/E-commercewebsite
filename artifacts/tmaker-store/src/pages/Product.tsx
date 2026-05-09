import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  "Black": "#1a1a1a", "White": "#ffffff", "Navy": "#001f5b", "Red": "#D31F26",
  "Royal": "#2040b0", "Royal Blue": "#2040b0", "Sport Royal": "#2040b0",
  "Maroon": "#6b0f1a", "Grey": "#808080", "Charcoal": "#4a4a4a",
  "Sport Grey": "#aaaaaa", "Ash Grey": "#c0c0c0", "Dark Grey": "#555555",
  "Dark Heather": "#6e6e6e", "Charcoal Cool": "#5a5a5a",
  "Heliconia": "#e0006e", "Purple": "#6a0dad", "Heather Purple": "#9b70c2",
  "Yellow": "#f5c518", "Daisy": "#fde272", "Safety Yellow": "#f5c100",
  "Orange": "#f47920", "Safety Orange": "#ff6600",
  "Lime Green": "#89c144", "Safety Green": "#00c040", "Lime": "#89c144",
  "Forest Green": "#1e4d2b", "Military Green": "#4b5320", "Jade Dome": "#00a693",
  "Irish Green": "#009a44", "Heather Irish Green": "#5bad6b",
  "Light Blue": "#aad4f5", "Carolina Blue": "#7bafd4", "Sky": "#87ceeb",
  "Light Pink": "#ffb6c1", "Safety Pink": "#ff69b4", "Azalea": "#f9609b",
  "Heather Red": "#c06070", "Heather Royal": "#5070c0",
  "Sapphire": "#0f52ba", "Cobalt": "#0047ab",
  "Sand": "#c2b280", "Beige": "#f5f0dc", "Gold": "#ffd700",
  "Pink": "#ffb6c1", "Fuchsia": "#ff00ff",
  "Dark Chocolate": "#3d1c02", "Neon Green": "#39ff14",
  "Ice Grey": "#d0d0d0", "Burma Jade": "#00a693",
  "Air Force Blue": "#5d8aa8", "Antique Royal": "#2e52a0",
  "Cherry Red": "#cc0000", "Bright Rose": "#ff5c77",
  "Light Green": "#90ee90", "Turquoise": "#40e0d0",
  "Dark Purple": "#301934", "Sea Blue": "#006994", "Magenta": "#ff00ff",
  "Heather Navy": "#2d4a8a", "Heather Cardinal": "#c04060",
};

const SIZES_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

type TabId = "description" | "additional" | "reviews";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const productQuery = useGetProduct(slug, {
    query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) }
  });
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("description");

  if (productQuery.isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-2">
              {Array(5).fill(null).map((_, i) => <Skeleton key={i} className="w-16 h-16" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (productQuery.error || !productQuery.data) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-gray-800 mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6">This product doesn't exist or has been removed.</p>
        <Link href="/shop" className="bg-[#D31F26] text-white font-bold px-6 py-3 hover:bg-red-700 transition-colors">
          Browse All Products
        </Link>
      </div>
    );
  }

  const p = productQuery.data;
  const images = p.images?.length ? p.images : [p.imageUrl];
  const hasDiscount = (p.discountPercent ?? 0) > 0;

  const currentVariant = p.variants?.find((v) => v.color === selectedColor) || p.variants?.[0];
  const availableSizes = (selectedColor
    ? p.variants?.find((v) => v.color === selectedColor)?.sizes
    : p.variants?.[0]?.sizes) || [];

  const sortedSizes = [...availableSizes].sort((a, b) => {
    const ai = SIZES_ORDER.indexOf(a);
    const bi = SIZES_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const unitPrice = p.priceMin;
  const lineTotal = unitPrice * qty;
  const waText = encodeURIComponent(
    `Hi TMaker, I would like to request a quote. Product: ${p.name}. Quantity: ____. Logo/customisation: Yes/No. Deadline: ____. Delivery location: ____.`
  );

  function handleAddToCart() {
    if (!selectedColor || !selectedSize) return;
    addToCart({
      productSlug: p.slug,
      name: p.name,
      imageUrl: p.imageUrl,
      color: selectedColor,
      size: selectedSize,
      quantity: qty,
      price: p.priceMin,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  const canAddToCart = !!selectedColor && !!selectedSize && qty >= 1;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-5 flex-wrap">
        <Link href="/" className="hover:text-[#D31F26]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        {p.categorySlug && (
          <>
            <Link href="/product-category/apparel" className="hover:text-[#D31F26]">Apparel</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/product-category/${p.categorySlug}`} className="hover:text-[#D31F26] capitalize">{p.categorySlug.replace(/-/g, " ")}</Link>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-gray-700 truncate max-w-[220px]">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-10 mb-10">
        {/* ── Image gallery ── */}
        <div>
          <div className="bg-gray-50 border border-gray-100 flex items-center justify-center mb-3 relative" style={{ aspectRatio: "1" }}>
            <img src={images[selectedImage]} alt={p.name} className="max-w-full max-h-full object-contain p-4" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`shrink-0 w-[72px] h-[72px] border-2 overflow-hidden bg-gray-50 ${selectedImage === i ? "border-[#D31F26]" : "border-gray-200 hover:border-gray-400"}`}
                data-testid={`button-image-${i}`}
              >
                <img src={img} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product info ── */}
        <div>
          {/* Title */}
          <h1 className="text-xl font-black text-gray-900 leading-tight mb-2">{p.name}</h1>

          {/* Price row */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl font-black text-[#D31F26]">
              RM {p.priceMin.toFixed(2)}
              {p.priceMax !== p.priceMin && <> – RM {p.priceMax.toFixed(2)}</>}
            </span>
            {hasDiscount && p.discountPercent && (
              <span className="bg-[#D31F26] text-white text-xs font-black px-2 py-0.5 rounded-sm">
                {p.discountPercent}% Off
              </span>
            )}
          </div>
          {hasDiscount && p.originalPriceMin && (
            <p className="text-sm text-gray-400 line-through mb-3">
              RM {p.originalPriceMin.toFixed(2)}{p.originalPriceMax && p.originalPriceMax !== p.originalPriceMin ? ` – RM ${p.originalPriceMax.toFixed(2)}` : ""}
            </p>
          )}

          {/* Size guide link */}
          <a href="#tabs" className="text-xs text-[#D31F26] font-bold underline mb-4 inline-block">_SizeGuide</a>

          {/* Colour swatches */}
          {p.variants && p.variants.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {p.variants.map((v) => {
                  const hex = COLOR_MAP[v.color] || "#cccccc";
                  const isWhitish = hex === "#ffffff" || hex === "#f5f0dc" || hex === "#fde272";
                  const isSelected = selectedColor === v.color;
                  return (
                    <button
                      key={v.color}
                      title={v.color}
                      onClick={() => { setSelectedColor(v.color); setSelectedSize(null); }}
                      className={`w-6 h-6 rounded-sm transition-all hover:scale-110 ${isSelected ? "ring-2 ring-[#D31F26] ring-offset-1 scale-110" : ""} ${isWhitish ? "border border-gray-300" : ""}`}
                      style={{ background: hex }}
                      data-testid={`button-color-${v.color}`}
                    />
                  );
                })}
              </div>
              {selectedColor && (
                <p className="text-xs text-gray-500">
                  Selected: <span className="font-semibold text-gray-800">{selectedColor}</span>
                </p>
              )}
            </div>
          )}

          {/* Size selector */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5 mb-1">
              {sortedSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[36px] px-2 py-1 text-xs border font-semibold transition-colors ${isSelected ? "border-[#D31F26] bg-[#D31F26] text-white" : "border-gray-300 text-gray-700 hover:border-gray-500"}`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {selectedSize && (
              <button className="text-xs text-gray-400 hover:text-[#D31F26] flex items-center gap-1" onClick={() => setSelectedSize(null)}>
                ⊘ Clear
              </button>
            )}
          </div>

          {/* Price + stock row */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-400 line-through">{hasDiscount && p.originalPriceMin ? `RM ${p.originalPriceMin.toFixed(2)}` : ""}</span>
            <div className="text-right">
              <span className="font-black text-[#D31F26] text-base">RM {p.priceMin.toFixed(2)}</span>
              <span className="ml-2 border border-[#D31F26] text-[#D31F26] text-xs font-bold px-2 py-0.5">In stock</span>
            </div>
          </div>

          {/* Your Price calculator */}
          <div className="border border-gray-200 px-4 py-3 mb-4 text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Your Price:</span>
              <span className="text-gray-500">
                RM {unitPrice.toFixed(2)} × {qty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-black text-gray-900">RM {lineTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Qty stepper */}
          <div className="flex items-center border border-gray-300 w-fit mb-5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 border-r border-gray-300 text-lg font-bold"
              data-testid="button-qty-minus"
            >–</button>
            <input
              type="number"
              value={qty}
              min={1}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center text-sm font-bold focus:outline-none py-2"
              data-testid="input-quantity"
            />
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 border-l border-gray-300 text-lg font-bold"
              data-testid="button-qty-plus"
            >+</button>
          </div>

          {/* CTA buttons — matches real site order */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 font-black text-sm tracking-wide transition-colors ${canAddToCart ? addedFeedback ? "bg-green-600 text-white" : "bg-[#D31F26] text-white hover:bg-red-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {addedFeedback ? "ADDED TO CART!" : "ADD TO CART"}
            </button>
            <button
              className="w-full py-3 border-2 border-gray-800 text-gray-800 font-black text-sm hover:bg-gray-800 hover:text-white transition-colors"
              data-testid="button-buy-now"
            >
              BUY NOW
            </button>
            <button className="w-full py-2.5 flex items-center justify-center gap-1.5 text-gray-600 hover:text-[#D31F26] text-sm border border-gray-200 hover:border-[#D31F26] transition-colors">
              <Heart className="w-4 h-4" /> Wishlist
            </button>
            <button
              className="w-full py-3 bg-gray-900 text-white font-black text-sm hover:bg-black transition-colors"
              data-testid="button-customize"
            >
              CUSTOMIZE YOUR OWN
            </button>
          </div>

          {!canAddToCart && (selectedColor || selectedSize) && (
            <p className="text-xs text-[#D31F26] mb-3">
              {!selectedColor ? "Please select a colour" : !selectedSize ? "Please select a size" : ""}
            </p>
          )}

          {/* Customise with TMaker section */}
          <div className="border border-gray-200 p-4 mt-4">
            <p className="text-xs font-black text-[#D31F26] uppercase mb-1 tracking-wide">Need logo printing or bulk price?</p>
            <h3 className="font-black text-gray-900 mb-3">CUSTOMISE THIS PRODUCT WITH TMAKER</h3>
            <p className="text-xs text-gray-500 mb-4">
              Send us this product name, quantity, logo or artwork, deadline and delivery location. Our team will recommend the suitable printing method and bulk quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <a
                href={`https://wa.me/60129088654?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold py-2.5 px-4 hover:bg-[#1ebe5d] transition-colors"
                data-testid="button-whatsapp-quote"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp Product Quote
              </a>
              <Link
                href="/custom-made#quote"
                className="flex-1 flex items-center justify-center bg-[#D31F26] text-white text-sm font-bold py-2.5 px-4 hover:bg-red-700 transition-colors"
                data-testid="button-formal-quote"
              >
                Get Formal Quote
              </Link>
            </div>
            <ul className="space-y-1">
              {["Logo printing and embroidery advice", "Bulk order recommendation", "Artwork and deadline checking"].map((pt) => (
                <li key={pt} className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="text-[#D31F26] font-bold">•</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div id="tabs" className="border border-gray-200 mb-10">
        <div className="flex border-b border-gray-200">
          {(["description", "additional", "reviews"] as TabId[]).map((tab) => {
            const labels: Record<TabId, string> = {
              description: "Description",
              additional: "Additional information",
              reviews: "Reviews 0",
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold border-r border-gray-200 transition-colors ${activeTab === tab ? "bg-white text-gray-900 border-b-2 border-b-[#D31F26]" : "bg-gray-50 text-gray-500 hover:text-gray-700"}`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>
        <div className="p-5">
          {activeTab === "description" && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-sm mb-4">
                {[
                  { label: "Brand", value: p.brand },
                  { label: "Product Type", value: p.productType },
                  { label: "Material", value: p.material },
                  { label: "Collar", value: p.collar },
                  { label: "Sleeve Style", value: p.sleeveStyle },
                  { label: "Gender", value: p.gender },
                ].filter((r) => r.value).map((row) => (
                  <div key={row.label}>
                    <span className="font-semibold text-gray-600">{row.label}: </span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>
              {p.description && <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>}
              <div className="mt-4 bg-[#D31F26] text-white p-4">
                <h4 className="font-black mb-1">Delivery</h4>
                <p className="text-sm text-red-200">Delivery Detail: 7 working days after confirm the order.</p>
              </div>
            </div>
          )}
          {activeTab === "additional" && (
            <div>
              <table className="text-sm w-full">
                <tbody>
                  {[
                    { label: "Available Sizes", value: p.variants?.[0]?.sizes?.join(", ") },
                    { label: "Printing Methods", value: p.printingMethods?.join(", ") },
                    { label: "Colours", value: p.variants?.map(v => v.color).join(", ") },
                    { label: "Currency", value: p.currency },
                  ].filter((r) => r.value).map((row) => (
                    <tr key={row.label} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-semibold text-gray-600 w-40">{row.label}</td>
                      <td className="py-2 text-gray-800">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">There are no reviews yet.</p>
              <p className="text-sm text-gray-400">You must be logged in to post a review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
