"use client";

import { useState } from "react";
import { Heart, X, Check } from "lucide-react";

interface WelcomeModalProps {
  onSave: (name: string, phone: string) => void;
  onClose: () => void;
}

export default function WelcomeModal({ onSave, onClose }: WelcomeModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-5 pb-10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-coral fill-coral" />
            <span className="font-sora font-bold text-ink">Sauvegarder ce produit</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-400 font-jakarta mb-4">Entre ton prénom pour créer ta wishlist personnelle</p>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ton prénom *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-jakarta outline-none focus:border-saffron"
          />
          <input
            type="tel"
            placeholder="Téléphone (optionnel)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-jakarta outline-none focus:border-saffron"
          />
          <button
            onClick={() => name.trim() && onSave(name.trim(), phone.trim())}
            disabled={!name.trim()}
            className="w-full bg-ink text-saffron font-sora font-bold py-3 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Check size={16} /> Créer ma wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
