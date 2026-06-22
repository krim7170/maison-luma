"use client";

import { useState } from "react";
import { User, Check } from "lucide-react";

interface WelcomeModalProps {
  onSave: (name: string, phone: string) => void;
}

export default function WelcomeModal({ onSave }: WelcomeModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 pb-10 shadow-2xl">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center">
            <User size={22} className="text-saffron" />
          </div>
          <div>
            <h2 className="font-sora font-extrabold text-ink text-lg">Bienvenue sur Souk !</h2>
            <p className="text-gray-400 text-xs font-jakarta">Crée ton profil pour sauvegarder tes favoris</p>
          </div>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ton prénom *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-jakarta outline-none focus:border-saffron"
          />
          <input
            type="tel"
            placeholder="Ton téléphone (optionnel)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-jakarta outline-none focus:border-saffron"
          />
          <button
            onClick={() => name.trim() && onSave(name.trim(), phone.trim())}
            disabled={!name.trim()}
            className="w-full bg-ink text-saffron font-sora font-bold py-3.5 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Check size={16} /> Commencer
          </button>
        </div>
      </div>
    </div>
  );
}
