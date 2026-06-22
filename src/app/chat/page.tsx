"use client";

import BottomNav from "@/components/BottomNav";
import { mockSettings } from "@/lib/mock-data";
import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour, j'aimerais avoir des informations sur vos produits.");
    window.open(`https://wa.me/${mockSettings.whatsapp_number}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-sable pb-24 flex flex-col">
      <header className="bg-ink px-4 pt-10 pb-5">
        <div className="max-w-lg mx-auto">
          <h1 className="font-sora text-2xl font-extrabold text-saffron">CHAT</h1>
          <p className="text-white/50 text-sm font-jakarta mt-1">Contactez-nous</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
          <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={40} className="text-[#25D366]" />
          </div>
          <h2 className="font-sora text-xl font-bold text-ink mb-2">
            Contactez Le K sur WhatsApp
          </h2>
          <p className="text-gray-500 font-jakarta text-sm mb-6 leading-relaxed">
            Pour toute question sur un produit, une commande, ou pour négocier un prix — on répond rapidement !
          </p>
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white font-sora font-bold py-4 rounded-xl text-base flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform"
          >
            <MessageCircle size={22} />
            Ouvrir WhatsApp
          </button>
          <p className="text-xs text-gray-400 mt-4 font-jakarta">
            Disponible tous les jours
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
