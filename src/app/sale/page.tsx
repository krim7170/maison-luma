"use client";

import BottomNav from "@/components/BottomNav";
import { mockProducts, mockShops, mockSettings } from "@/lib/mock-data";
import { Product, Shop } from "@/types";

export default function SalePage() {
  const saleProducts = mockProducts.filter((p) => p.is_sale);

  const getShop = (shopId: string): Shop | undefined =>
    mockShops.find((s) => s.id === shopId);

  const handleOrder = (product: Product, shop?: Shop, photoIndex?: number) => {
    const msg = encodeURIComponent(
      `Bonjour, je voudrais commander :\n\n🛍️ *${product.name}*\n🏪 Boutique : ${shop?.name || ""}\n💰 Prix promo : ${product.price} €${photoIndex !== undefined ? `\n🎨 Variante : photo n°${photoIndex + 1}` : ""}\n\nMerci !`
    );
    window.open(`https://wa.me/${mockSettings.whatsapp_number}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-sable pb-24">
      <header className="bg-ink px-4 pt-10 pb-5">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <h1 className="font-sora text-2xl font-extrabold text-saffron">SOLDES</h1>
              <p className="text-white/50 text-sm font-jakarta">
                {saleProducts.length} offre{saleProducts.length > 1 ? "s" : ""} en cours
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {saleProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-jakarta">
            <p className="text-4xl mb-3">💤</p>
            <p>Pas de promo en ce moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {saleProducts.map((product) => {
              const shop = getShop(product.shop_id);
              const discount = product.old_price
                ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
                : null;
              return (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="relative bg-gray-100 aspect-square">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {shop?.emoji || "🛍️"}
                      </div>
                    )}
                    {discount && (
                      <span className="absolute top-2 left-2 bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full font-sora">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-ink leading-tight truncate">
                      {product.name}
                    </p>
                    {shop && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {shop.emoji} {shop.name}
                      </p>
                    )}
                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <span className="price-tag text-sm px-2 py-1 inline-block">
                          {product.price} €
                        </span>
                        {product.old_price && (
                          <span className="block text-xs text-gray-400 line-through mt-1">
                            {product.old_price} €
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleOrder(product, shop)}
                        className="bg-teal text-white text-xs font-semibold px-3 py-1.5 rounded-full font-jakarta"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
