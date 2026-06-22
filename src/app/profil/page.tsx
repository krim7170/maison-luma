"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Heart, Star, Clock, User, Edit3, Check } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { getProducts } from "@/lib/data";
import { Product } from "@/types";

export default function ProfilPage() {
  const { profile, showWelcome, createProfile, toggleWishlist } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone || "");
      if (profile.wishlist.length > 0) {
        getProducts().then((all) => {
          setWishlistProducts(all.filter((p) => profile.wishlist.includes(p.id)));
        });
      } else {
        setWishlistProducts([]);
      }
    }
  }, [profile]);

  if (showWelcome || !profile) {
    return (
      <div className="min-h-screen bg-sable pb-24 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 mx-4 shadow-sm max-w-sm w-full space-y-3">
          <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center mx-auto">
            <User size={22} className="text-saffron" />
          </div>
          <h2 className="font-sora font-extrabold text-ink text-center text-lg">Crée ton profil</h2>
          <input type="text" placeholder="Ton prénom *" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-saffron" />
          <input type="tel" placeholder="Téléphone (optionnel)" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-saffron" />
          <button onClick={() => name.trim() && createProfile(name.trim(), phone.trim())} disabled={!name.trim()}
            className="w-full bg-ink text-saffron font-bold py-3 rounded-xl text-sm disabled:opacity-40">
            Commencer
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

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
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-ink rounded-full flex items-center justify-center flex-shrink-0">
              <User size={28} className="text-saffron" />
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-saffron" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Téléphone" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-saffron" />
                  <button onClick={() => { createProfile(name, phone); setEditing(false); }}
                    className="w-full bg-ink text-saffron font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                    <Check size={14} /> Enregistrer
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sora font-bold text-ink text-lg">{profile.name}</p>
                    {profile.phone && <p className="text-sm text-gray-400">{profile.phone}</p>}
                  </div>
                  <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-ink">
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-ink rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Star size={18} className="text-saffron" />
            <span className="font-sora font-bold text-white text-sm">Wallet fidélité</span>
          </div>
          <p className="font-sora font-extrabold text-saffron text-3xl">0</p>
          <p className="text-white/50 text-xs font-jakarta mt-1">points · +10 à chaque commande</p>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={18} className="text-coral" />
            <span className="font-sora font-bold text-ink text-sm">Ma wishlist ({wishlistProducts.length})</span>
          </div>
          {wishlistProducts.length === 0 ? (
            <p className="text-gray-400 text-sm font-jakarta text-center py-4">
              Aucun produit sauvegardé.<br />Appuie sur ❤️ sur un produit.
            </p>
          ) : (
            <div className="space-y-2">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {p.image_url
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-xl">🛍️</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.price} €</p>
                  </div>
                  <button onClick={() => toggleWishlist(p.id)} className="text-coral">
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historique */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-teal" />
            <span className="font-sora font-bold text-ink text-sm">Historique</span>
          </div>
          <p className="text-gray-400 text-sm font-jakarta text-center py-4">Pas encore de commandes.</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
