import { Shop, Product } from "@/types";

export const mockShops: Shop[] = [
  { id: "shop-1", name: "Sport Zone", emoji: "⚽", categories: ["Sports"] },
  { id: "shop-2", name: "Mode Femme", emoji: "👗", categories: ["Vêtement femmes", "Accessoires"] },
  { id: "shop-3", name: "Tech & Phone", emoji: "📱", categories: ["Phone", "Ordinateurs"] },
  { id: "shop-4", name: "Chaussures & Co", emoji: "👟", categories: ["Chaussures et sacs"] },
];

const base = { is_bulk: false, images: [], sizes: [] };

export const mockProducts: Product[] = [
  { ...base, id: "p1", shop_id: "shop-1", name: "Maillot Barça 2024", price: 45, old_price: 60, is_sale: true, image_url: undefined, categories: ["Sports"], sizes: ["S","M","L","XL"] },
  { ...base, id: "p2", shop_id: "shop-1", name: "Maillot Real Madrid", price: 45, is_sale: false, image_url: undefined, categories: ["Sports"] },
  { ...base, id: "p3", shop_id: "shop-1", name: "Maillot PSG", price: 50, old_price: 70, is_sale: true, image_url: undefined, categories: ["Sports"] },
  { ...base, id: "p4", shop_id: "shop-2", name: "Robe fleurie", price: 35, is_sale: false, image_url: undefined, categories: ["Vêtement femmes"] },
  { ...base, id: "p5", shop_id: "shop-2", name: "Sandales dorées", price: 28, old_price: 35, is_sale: true, image_url: undefined, categories: ["Chaussures et sacs"] },
  { ...base, id: "p6", shop_id: "shop-3", name: "Écouteurs Bluetooth", price: 80, old_price: 120, is_sale: true, image_url: undefined, categories: ["Phone"] },
  { ...base, id: "p7", shop_id: "shop-3", name: "Chargeur rapide 65W", price: 25, is_sale: false, image_url: undefined, categories: ["Phone"] },
  { ...base, id: "p8", shop_id: "shop-4", name: "Baskets blanches", price: 75, is_sale: false, image_url: undefined, categories: ["Chaussures et sacs"], sizes: ["40","41","42","43"] },
  { ...base, id: "p9", shop_id: "shop-4", name: "Sandales cuir homme", price: 40, old_price: 55, is_sale: true, image_url: undefined, categories: ["Chaussures et sacs"] },
];

export const mockSettings = {
  whatsapp_number: "212600000000",
};
