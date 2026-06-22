"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { Product, Shop } from "@/types";

interface ProductCardProps {
  product: Product;
  shop?: Shop;
  wishlist?: string[];
  onWishlistToggle?: (productId: string) => void;
  onOrder?: (product: Product, shop?: Shop) => void;
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

  return (
    <div className={`${cardWidth} flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm`}>
      {/* Image */}
      <div className="relative bg-gray-100 aspect-square">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
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
            <Heart
              size={14}
              className={isWished ? "text-coral fill-coral" : "text-gray-400"}
            />
          </button>
        )}
      </div>

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
              onClick={() => onOrder(product, shop)}
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
