"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Product, Shop } from "@/types";

interface ProductCardProps {
  product: Product;
  shop?: Shop;
  wishlist?: string[];
  onWishlistToggle?: (productId: string) => void;
  onOrder?: (product: Product, shop?: Shop, selectedLabel?: string) => void;
  size?: "sm" | "md";
}

export default function ProductCard({
  product,
  shop,
  wishlist = [],
  onWishlistToggle,
  onOrder,
  size = "sm",
}: ProductCardProps) {
  const isWished = wishlist.includes(product.id);
  const cardWidth = size === "sm" ? "w-36" : "w-44";
  const photos = product.images?.length ? product.images : product.image_url ? [product.image_url] : [];
  const labels = product.image_labels || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentPhoto = photos[selectedIndex];
  const selectedLabel = labels[selectedIndex] || "";

  return (
    <div className={`${cardWidth} flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm`}>
      {/* Main image */}
      <div className="relative bg-gray-100 aspect-square">
        {currentPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentPhoto} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            {shop?.emoji || "🛍️"}
          </div>
        )}
        {product.is_sale && (
          <span className="absolute top-2 left-2 bg-coral text-white text-[10px] font-sora font-bold px-2 py-0.5 rounded-full">
            PROMO
          </span>
        )}
        {onWishlistToggle && (
          <button
            onClick={() => onWishlistToggle(product.id)}
            className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
          >
            <Heart size={14} className={isWished ? "text-coral fill-coral" : "text-gray-400"} />
          </button>
        )}
      </div>

      {/* Thumbnail selector — only if multiple photos */}
      {photos.length > 1 && (
        <div className="flex gap-1 px-2 pt-1.5 overflow-x-auto scrollbar-hide">
          {photos.map((src, i) => (
            <button key={i} onClick={() => setSelectedIndex(i)} className="flex flex-col items-center gap-0.5 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={labels[i] || `variante ${i + 1}`}
                className={`w-7 h-7 rounded object-cover border-2 transition-all ${
                  i === selectedIndex ? "border-saffron" : "border-transparent opacity-60"
                }`}
              />
              {labels[i] && (
                <span className={`text-[8px] leading-tight text-center max-w-[28px] truncate ${i === selectedIndex ? "text-ink font-bold" : "text-gray-400"}`}>
                  {labels[i]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="p-2">
        <p className="text-xs font-semibold text-ink truncate leading-tight">{product.name}</p>
        {shop && <p className="text-[10px] text-gray-400 mt-0.5">{shop.emoji} {shop.name}</p>}
        <div className="mt-1.5 flex items-end justify-between gap-1">
          <div>
            <span className="price-tag text-xs px-1.5 py-0.5 inline-block">
              {product.price} €
            </span>
            {product.old_price && (
              <span className="block text-[10px] text-gray-400 line-through mt-0.5">
                {product.old_price} €
              </span>
            )}
          </div>
          {onOrder && (
            <button
              onClick={() => onOrder(product, shop, photos.length > 1 ? (selectedLabel || `photo n°${selectedIndex + 1}`) : undefined)}
              className="w-7 h-7 bg-teal rounded-full flex items-center justify-center flex-shrink-0"
            >
              <ShoppingBag size={13} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
