"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";
import { getShops, getProducts, getSettings } from "@/lib/data";
import { Shop, Product } from "@/types";

export default function HomePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [whatsapp, setWhatsapp] = useState("212600000000");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getShops(), getProducts(), getSettings()]).then(
      ([s, p, settings]) => {
        setShops(s);
        setProducts(p);
        setWhatsapp(settings.whatsapp_number);
        setLoading(false);
      }
    );
  }, []);

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const catMatch = category === "ALL" || shop.categories.includes(category);
      const searchMatch =
        !search ||
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        products.some(
          (p) =>
            p.shop_id === shop.id &&
            p.name.toLowerCase().includes(search.toLowerCase())
        );
      return catMatch && searchMatch;
    });
  }, [search, category, shops, products]);

  const getShopProducts = (shopId: string) => {
    return products.filter((p) => {
      const catMatch = category === "ALL" || p.categories.includes(category);
      const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return p.shop_id === shopId && catMatch && (searchMatch || !search);
    });
  };

  const handleOrder = (product: Product, shop?: Shop, selectedLabel?: string) => {
    const msg = encodeURIComponent(
      `Bonjour, je voudrais commander :\n\n🛍️ *${product.name}*\n🏪 Boutique : ${shop?.name || ""}${selectedLabel ? `\n🎨 Couleur : ${selectedLabel}` : ""}\n💰 Prix : ${product.price} €\n\nMerci !`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-sable pb-24">
      {/* Header */}
      <header className="bg-ink px-4 pt-10 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-sora text-2xl font-extrabold text-saffron tracking-tight">
              SOUK
            </h1>
            <Link
              href="/admin"
              className="text-white/30 text-xs font-jakarta hover:text-white/60 transition-colors"
            >
              Admin
            </Link>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Chercher un produit ou une boutique…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/40 text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none border border-white/10 focus:border-saffron/60 font-jakarta"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <CategoryChips selected={category} onChange={setCategory} />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-4 space-y-6">
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-jakarta">
            <div className="animate-spin text-4xl mb-3">⏳</div>
            <p>Chargement du catalogue…</p>
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-jakarta">
            <p className="text-4xl mb-3">🔍</p>
            <p>Aucun résultat pour cette recherche</p>
          </div>
        ) : (
          filteredShops.map((shop) => {
            const shopProducts = getShopProducts(shop.id);
            if (shopProducts.length === 0) return null;
            return (
              <div key={shop.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{shop.emoji}</span>
                  <div>
                    <h2 className="font-sora font-bold text-ink leading-tight">{shop.name}</h2>
                    <p className="text-xs text-gray-400 font-jakarta">
                      {shopProducts.length} produit{shopProducts.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {shopProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      shop={shop}
                      onOrder={handleOrder}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </main>

      <BottomNav />
    </div>
  );
}
