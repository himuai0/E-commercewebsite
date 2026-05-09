import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetProduct, getGetProductQueryKey } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Minus, Plus, ShoppingCart, Zap } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  "Black": "#000000", "White": "#ffffff", "Navy": "#001f5b", "Red": "#D31F26",
  "Royal": "#2040b0", "Royal Blue": "#2040b0", "Maroon": "#800000", "Grey": "#808080",
  "Charcoal": "#4a4a4a", "Sport Grey": "#999999", "Ash Grey": "#b0b0b0", "Dark Grey": "#555555",
  "Heliconia": "#e0006e", "Purple": "#6a0dad", "Yellow": "#f5c518", "Orange": "#f47920",
  "Lime Green": "#89c144", "Forest Green": "#1e4d2b", "Light Blue": "#aad4f5",
  "Tiffany Blue": "#81d8d0", "Midnight Green": "#1b4d3e", "Sky": "#87ceeb",
  "Sapphire": "#0f52ba", "Navy Pro": "#001f5b", "Sand": "#c2b280", "Beige": "#f5f0dc",
  "Pink": "#ffb6c1", "Fuchsia": "#ff00ff", "Tan": "#d2b48c", "Basil": "#3b5323",
  "Wheat": "#f5deb3", "Elderberry": "#5b2c4e", "Neon Green": "#39ff14",
  "Ice Grey": "#d0d0d0", "Daisy": "#fde272", "Burma Jade": "#00a693",
  "Air Force Blue": "#5d8aa8", "Antique Royal": "#2e52a0", "Cherry Red": "#cc0000",
  "Bright Rose": "#ff5c77", "Light Green": "#90ee90",
};

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const productQuery = useGetProduct(slug, {
    query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) }
  });
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(50);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (productQuery.isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-2">
              {Array(4).fill(null).map((_, i) => <Skeleton key={i} className="w-16 h-16" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (productQuery.error || !productQuery.data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-4xl mb-4">👕</p>
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
  const availableSizes = currentVariant?.sizes || [];

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#D31F26]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-[#D31F26]">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/product-category/${p.categorySlug}`} className="hover:text-[#D31F26]">{p.categorySlug}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-semibold truncate max-w-[200px]">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Image gallery */}
        <div>
          <div className="aspect-square overflow-hidden bg-gray-50 mb-3">
            <img
              src={images[selectedImage]}
              alt={p.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`shrink-0 w-16 h-16 border-2 overflow-hidden ${selectedImage === i ? "border-[#D31F26]" : "border-gray-200 hover:border-gray-400"}`}
                data-testid={`button-image-${i}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className="text-xs font-bold text-gray-400 mb-1 tracking-widest uppercase">{p.brand}</p>
          <h1 className="text-2xl font-black text-gray-900 mb-3">{p.name}</h1>

          {/* Price */}
          <div className="mb-4">
            {hasDiscount && p.originalPriceMin && (
              <p className="text-sm text-gray-400 line-through">
                RM {p.originalPriceMin.toFixed(2)} – RM {p.originalPriceMax?.toFixed(2) ?? p.originalPriceMin.toFixed(2)}
              </p>
            )}
            <p className="text-2xl font-black text-[#D31F26]">
              RM {p.priceMin.toFixed(2)}
              {p.priceMax !== p.priceMin && ` – RM ${p.priceMax.toFixed(2)}`}
              <span className="text-sm font-normal text-gray-500 ml-1">/ piece</span>
            </p>
            {hasDiscount && (
              <span className="inline-block bg-[#D31F26] text-white text-xs font-bold px-2 py-0.5 mt-1">
                {p.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* MOQ notice */}
          <div className="bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800 mb-4">
            Minimum order: 50 pieces per colour. Bulk discounts apply for 100+ pieces.
          </div>

          {/* Color picker */}
          {p.variants && p.variants.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2">
                Colour: <span className="font-normal text-gray-500">{selectedColor || "Select a colour"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v) => {
                  const hex = COLOR_MAP[v.color] || "#cccccc";
                  const isSelected = selectedColor === v.color;
                  return (
                    <button
                      key={v.color}
                      title={v.color}
                      onClick={() => { setSelectedColor(v.color); setSelectedSize(null); }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${isSelected ? "border-[#D31F26] scale-110 ring-2 ring-[#D31F26] ring-offset-1" : "border-gray-300"}`}
                      style={{ background: hex }}
                      data-testid={`button-color-${v.color}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-700 mb-2">
              Size: <span className="font-normal text-gray-500">{selectedSize || "Select a size"}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {(selectedColor ? availableSizes : (p.variants?.[0]?.sizes || [])).map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[40px] px-3 py-1.5 text-sm border-2 font-bold transition-colors ${isSelected ? "border-[#D31F26] bg-[#D31F26] text-white" : "border-gray-300 text-gray-700 hover:border-gray-500"}`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <p className="text-sm font-bold text-gray-700 mb-2">Quantity (min 50 pcs)</p>
            <div className="flex items-center border border-gray-300 w-fit">
              <button
                onClick={() => setQty((q) => Math.max(50, q - 10))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors border-r border-gray-300"
                data-testid="button-qty-minus"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={qty}
                min={50}
                onChange={(e) => setQty(Math.max(50, parseInt(e.target.value) || 50))}
                className="w-20 text-center text-sm font-bold focus:outline-none py-2"
                data-testid="input-quantity"
              />
              <button
                onClick={() => setQty((q) => q + 10)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors border-l border-gray-300"
                data-testid="button-qty-plus"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 font-black text-sm transition-colors ${canAddToCart ? addedFeedback ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {addedFeedback ? "ADDED TO CART!" : "ADD TO CART"}
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#D31F26] text-white font-black text-sm hover:bg-red-700 transition-colors"
              data-testid="button-buy-now"
            >
              <Zap className="w-4 h-4" />
              BUY NOW
            </button>
            <Link
              href="/custom-made#quote"
              className="w-full flex items-center justify-center py-3 border-2 border-gray-800 text-gray-800 font-black text-sm hover:bg-gray-800 hover:text-white transition-colors"
              data-testid="button-customize"
            >
              CUSTOMIZE YOUR OWN
            </Link>
          </div>

          {!canAddToCart && (selectedColor || selectedSize) && (
            <p className="text-xs text-[#D31F26] mb-3">
              {!selectedColor ? "Please select a colour" : "Please select a size"}
            </p>
          )}

          {/* Printing methods */}
          {p.printingMethods && p.printingMethods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {p.printingMethods.map((m) => (
                <span key={m} className="text-xs border border-gray-300 px-2 py-1 text-gray-500">{m}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Specs table */}
      <div className="border border-gray-200 mb-8">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <h2 className="font-black text-gray-900">Product Specifications</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { label: "Brand", value: p.brand },
            { label: "Product Type", value: p.productType },
            { label: "Material", value: p.material },
            { label: "Collar", value: p.collar },
            { label: "Sleeve Style", value: p.sleeveStyle },
            { label: "Gender", value: p.gender },
            { label: "Available Sizes", value: p.variants?.[0]?.sizes?.join(", ") },
            { label: "Printing Methods", value: p.printingMethods?.join(", ") },
            { label: "Currency", value: p.currency },
          ].filter((r) => r.value).map((row) => (
            <div key={row.label} className="grid grid-cols-3 px-5 py-3">
              <span className="text-sm font-semibold text-gray-600">{row.label}</span>
              <span className="text-sm text-gray-800 col-span-2">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      {p.description && (
        <div className="border border-gray-200 mb-8">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <h2 className="font-black text-gray-900">Description</h2>
          </div>
          <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{p.description}</div>
        </div>
      )}

      {/* Customisation banner */}
      <div className="bg-gray-900 text-white px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-black text-xl mb-1">Need a Custom Design?</h3>
          <p className="text-gray-400 text-sm">Add your logo, name, or artwork. Free design consultation for orders above 100 pcs.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/custom-made#quote" className="bg-[#D31F26] text-white font-black px-6 py-3 hover:bg-red-700 transition-colors whitespace-nowrap">
            GET A QUOTE
          </Link>
          <Link href="/create-your-design" className="border border-white text-white font-black px-6 py-3 hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap">
            DESIGN STUDIO
          </Link>
        </div>
      </div>
    </div>
  );
}
