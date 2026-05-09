import { useState } from "react";
import { Link } from "wouter";
import { X, MessageCircle, Send } from "lucide-react";

export default function FloatingCTAs() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatSent, setChatSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setChatSent(true);
    setChatMsg("");
    setTimeout(() => setChatSent(false), 3000);
  }

  return (
    <>
      {/* Chat popup */}
      {chatOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-72 bg-white border border-gray-200 shadow-2xl">
          <div className="bg-[#D31F26] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-black text-sm">Nashah Advisory Support</p>
              <p className="text-xs text-red-200">Instant help for products, quotes and orders</p>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 min-h-[120px] flex items-center justify-center">
            {chatSent ? (
              <p className="text-sm text-green-600 font-semibold text-center">Message sent! Our team will reply via WhatsApp shortly.</p>
            ) : (
              <p className="text-sm text-gray-400 text-center">Send us a message and we'll reply within minutes during business hours.</p>
            )}
          </div>
          <form onSubmit={handleSend} className="border-t border-gray-200 flex">
            <input
              type="text"
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 focus:outline-none"
              data-testid="input-chat"
            />
            <button type="submit" className="bg-[#D31F26] text-white px-3 hover:bg-red-700 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating buttons — matches real site: green "Need Help?" + orange "Get a Quote" */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
        {/* WhatsApp button */}
        <a
          href="https://wa.me/60183652033"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors"
          data-testid="button-whatsapp-float"
        >
          <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Need Help?
        </a>
        <Link
          href="/custom-made#quote"
          className="flex items-center gap-2 bg-[#FF6B00] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          data-testid="button-get-quote-float"
        >
          <MessageCircle className="w-4 h-4" />
          Get a Quote
        </Link>
      </div>
    </>
  );
}
