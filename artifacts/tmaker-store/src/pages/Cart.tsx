import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some custom apparel to get started. Minimum 50 pieces per order.</p>
        <Link href="/shop" className="bg-[#D31F26] text-white font-black px-8 py-3 hover:bg-red-700 transition-colors" data-testid="button-browse-products">
          BROWSE PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Shopping Cart ({totalItems} items)</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-[#D31F26] flex items-center gap-1 transition-colors"
          data-testid="button-clear-cart"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border border-gray-200 p-4 bg-white" data-testid={`cart-item-${item.id}`}>
              {/* Image */}
              <div className="w-20 h-20 shrink-0 bg-gray-50 overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                <div className="flex gap-3 text-xs text-gray-500 mb-3">
                  <span>Colour: <strong className="text-gray-700">{item.color}</strong></span>
                  <span>Size: <strong className="text-gray-700">{item.size}</strong></span>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty */}
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(50, item.quantity - 10))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 border-r border-gray-300"
                      data-testid={`button-qty-minus-${item.id}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 10)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 border-l border-gray-300"
                      data-testid={`button-qty-plus-${item.id}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">RM {item.price.toFixed(2)} × {item.quantity}</p>
                      <p className="font-black text-gray-900" data-testid={`text-item-total-${item.id}`}>
                        RM {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-[#D31F26] transition-colors"
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 bg-white">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <h2 className="font-black text-gray-900">Order Summary</h2>
            </div>
            <div className="px-5 py-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({totalItems} pcs)</span>
                <span>RM {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Printing &amp; customisation</span>
                <span className="text-green-600">Quoted separately</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">Free above RM500</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-black text-gray-900">
                <span>Estimated Total</span>
                <span data-testid="text-cart-total">RM {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="px-5 pb-5 space-y-2">
              <Link href="/custom-made#quote" className="block w-full text-center bg-[#D31F26] text-white font-black py-3 hover:bg-red-700 transition-colors" data-testid="button-checkout">
                PROCEED TO CHECKOUT
              </Link>
              <Link href="/shop" className="block w-full text-center border border-gray-300 text-gray-700 font-bold py-3 hover:bg-gray-50 transition-colors" data-testid="button-continue-shopping">
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 border border-gray-200 bg-white px-5 py-4 text-xs text-gray-500 space-y-2">
            <p className="font-bold text-gray-700">Order Notes:</p>
            <p>• Minimum 50 pieces per colour</p>
            <p>• Printing cost quoted separately based on artwork</p>
            <p>• Delivery: 7–14 working days after artwork approval</p>
            <p>• Free colour mockup before production</p>
          </div>
        </div>
      </div>
    </div>
  );
}
