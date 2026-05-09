import { Link } from "wouter";
import type { Product } from "@workspace/api-client-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const hasDiscount = (product.discountPercent ?? 0) > 0;

  return (
    <div className="group bg-white border border-gray-200 hover:border-[#D31F26] hover:shadow-md transition-all" data-testid={`card-product-${product.id}`}>
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[#D31F26] text-white text-xs font-bold px-2 py-1">
            -{product.discountPercent}%
          </span>
        )}
        {product.isHot && !hasDiscount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1">
            HOT
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="mb-3">
          {hasDiscount && product.originalPriceMin && (
            <p className="text-xs text-gray-400 line-through">
              RM {product.originalPriceMin.toFixed(2)} – RM {product.originalPriceMax?.toFixed(2)}
            </p>
          )}
          <p className="text-sm font-bold text-[#D31F26]" data-testid={`text-price-${product.id}`}>
            RM {product.priceMin.toFixed(2)}
            {product.priceMax !== product.priceMin && ` – RM ${product.priceMax.toFixed(2)}`}
          </p>
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="block w-full text-center bg-black text-white text-xs font-bold py-2 hover:bg-[#D31F26] transition-colors"
          data-testid={`button-select-${product.id}`}
        >
          SELECT OPTIONS
        </Link>
      </div>
    </div>
  );
}
