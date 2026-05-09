import { useState } from "react";
import { useGenerateProduct } from "@workspace/api-client-react";
import type { GeneratedProduct } from "@workspace/api-client-react";
import { Zap, Tag, Package, TrendingUp } from "lucide-react";

const PRICE_RANGES = ["budget", "mid-range", "premium"];
const STYLES = ["casual", "formal", "sporty", "streetwear", "corporate"];

export default function AIGenerator() {
  const [form, setForm] = useState({
    niche: "",
    audience: "general public",
    priceRange: "mid-range",
    style: "casual",
    material: "",
  });
  const [result, setResult] = useState<GeneratedProduct | null>(null);

  const mutation = useGenerateProduct();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.niche.trim()) return;
    mutation.mutate(
      { data: { niche: form.niche, audience: form.audience, priceRange: form.priceRange, style: form.style, material: form.material || undefined } },
      { onSuccess: (data) => setResult(data) }
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#D31F26]/10 text-[#D31F26] px-4 py-2 text-sm font-bold mb-4">
          <Zap className="w-4 h-4" /> AI-POWERED PRODUCT GENERATOR
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Generate Your Custom Product</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Describe your niche, target audience, and style. Our AI will generate a complete product concept — name, description, specs, SEO, and variants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="border border-gray-200 bg-white">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-black text-gray-900">Product Details</h2>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Niche / Industry <span className="text-[#D31F26]">*</span>
              </label>
              <input
                type="text"
                value={form.niche}
                onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value }))}
                placeholder="e.g. fintech startup, football team, hospital nurses"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#D31F26]"
                required
                data-testid="input-niche"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
              <input
                type="text"
                value={form.audience}
                onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
                placeholder="e.g. young professionals, school kids, event attendees"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#D31F26]"
                data-testid="input-audience"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                <select
                  value={form.priceRange}
                  onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#D31F26]"
                  data-testid="select-price-range"
                >
                  {PRICE_RANGES.map((r) => (
                    <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Style</label>
                <select
                  value={form.style}
                  onChange={(e) => setForm((f) => ({ ...f, style: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#D31F26]"
                  data-testid="select-style"
                >
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Material (optional)</label>
              <input
                type="text"
                value={form.material}
                onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
                placeholder="e.g. 100% cotton, microfibre, polyester blend"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#D31F26]"
                data-testid="input-material"
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending || !form.niche.trim()}
              className={`w-full flex items-center justify-center gap-2 py-3 font-black text-sm transition-colors ${mutation.isPending || !form.niche.trim() ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#D31F26] text-white hover:bg-red-700"}`}
              data-testid="button-generate"
            >
              <Zap className="w-4 h-4" />
              {mutation.isPending ? "GENERATING..." : "GENERATE PRODUCT"}
            </button>

            {mutation.isError && (
              <p className="text-sm text-[#D31F26] text-center">Generation failed. Please try again.</p>
            )}
          </form>
        </div>

        {/* Result */}
        <div>
          {!result && !mutation.isPending && (
            <div className="border border-dashed border-gray-300 h-full flex items-center justify-center text-center px-8 py-16">
              <div>
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-semibold">Your generated product will appear here</p>
                <p className="text-gray-300 text-sm mt-2">Fill in the form and click Generate</p>
              </div>
            </div>
          )}

          {mutation.isPending && (
            <div className="border border-gray-200 bg-white h-full flex items-center justify-center text-center px-8 py-16">
              <div>
                <div className="w-12 h-12 border-4 border-[#D31F26] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Generating your product...</p>
                <p className="text-gray-400 text-sm mt-2">Analysing niche and creating concepts</p>
              </div>
            </div>
          )}

          {result && (
            <div className="border border-gray-200 bg-white">
              <div className="bg-[#D31F26] px-6 py-4">
                <h2 className="font-black text-white text-lg">{result.title}</h2>
                <p className="text-red-200 text-sm mt-1">{result.shortDescription}</p>
              </div>
              <div className="px-6 py-5 space-y-5">
                {/* Price */}
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#D31F26]" />
                  <span className="font-bold text-gray-900">
                    Estimated: RM {result.estimatedPrice.min.toFixed(2)} – RM {result.estimatedPrice.max.toFixed(2)} / pc
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-sm text-gray-700 mb-1">Product Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.longDescription}</p>
                </div>

                {/* Specs */}
                <div>
                  <h3 className="font-bold text-sm text-gray-700 mb-2">Specifications</h3>
                  <div className="border border-gray-200 divide-y divide-gray-100">
                    {Object.entries(result.specs).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 px-3 py-2 text-xs">
                        <span className="text-gray-500">{k}</span>
                        <span className="text-gray-800 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <h3 className="font-bold text-sm text-gray-700 mb-2">Suggested Variants</h3>
                  <div className="space-y-1">
                    {result.variants.map((v) => (
                      <div key={v.color} className="text-xs text-gray-600 flex gap-2">
                        <span className="font-semibold w-16 shrink-0">{v.color}</span>
                        <span className="text-gray-400">{v.sizes.join(" • ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-bold text-sm text-gray-700 mb-2">
                    <Tag className="w-3 h-3 inline mr-1" />Tags
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {result.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-gray-50 border border-gray-200 px-4 py-3 text-xs">
                  <p className="font-bold text-gray-700 mb-1">SEO Preview</p>
                  <p className="text-blue-600 font-semibold">{result.seoTitle}</p>
                  <p className="text-gray-500 mt-1">{result.seoDescription}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href="/custom-made#quote"
                    className="flex-1 text-center bg-[#D31F26] text-white font-black text-sm py-2 hover:bg-red-700 transition-colors"
                    data-testid="button-create-draft"
                  >
                    CREATE DRAFT
                  </a>
                  <button
                    onClick={() => mutation.mutate({ data: { niche: form.niche, audience: form.audience, priceRange: form.priceRange, style: form.style } }, { onSuccess: setResult })}
                    className="flex-1 border border-gray-800 text-gray-800 font-black text-sm py-2 hover:bg-gray-800 hover:text-white transition-colors"
                    data-testid="button-generate-variants"
                  >
                    GENERATE VARIANTS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
