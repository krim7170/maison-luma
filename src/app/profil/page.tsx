"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Heart, Star, Clock, User, Edit3, Check } from "lucide-react";

export default function ProfilPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      setEditing(false);
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-sable pb-24">
      <header className="bg-ink px-4 pt-10 pb-5">
        <div className="max-w-lg mx-auto">
          <h1 className="font-sora text-2xl font-extrabold text-saffron">MON PROFIL</h1>
          <p className="text-white/50 text-sm font-jakarta mt-1">Votre espace client</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-ink rounded-full flex items-center justify-center">
              <User size={28} className="text-saffron" />
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-jakarta outline-none focus:border-saffron"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-jakarta outline-none focus:border-saffron"
                  />
                  <button
                    onClick={handleSave}
                    disabled={!name.trim()}
                    className="w-full bg-ink text-saffron font-sora font-bold py-2 rounded-lg text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    Enregistrer
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sora font-bold text-ink text-lg">{name}</p>
                    {phone && <p className="text-sm text-gray-400 font-jakarta">{phone}</p>}
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-gray-400 hover:text-ink"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          {saved && !editing && (
            <p className="text-xs text-teal font-jakarta text-center">
              ✓ Profil enregistré
            </p>
          )}
        </div>

        {/* Wallet */}
        <div className="bg-ink rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Star size={18} className="text-saffron" />
            <span className="font-sora font-bold text-white text-sm">Wallet fidélité</span>
          </div>
          <p className="font-sora font-extrabold text-saffron text-3xl">0</p>
          <p className="text-white/50 text-xs font-jakarta mt-1">
            points · +10 à chaque commande
          </p>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={18} className="text-coral" />
            <span className="font-sora font-bold text-ink text-sm">Ma wishlist</span>
          </div>
          <p className="text-gray-400 text-sm font-jakarta text-center py-4">
            Aucun produit sauvegardé pour l&apos;instant.<br />
            Appuyez sur ❤️ sur un produit pour l&apos;ajouter.
          </p>
        </div>

        {/* Historique */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-teal" />
            <span className="font-sora font-bold text-ink text-sm">Historique</span>
          </div>
          <p className="text-gray-400 text-sm font-jakarta text-center py-4">
            Pas encore de commandes.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
