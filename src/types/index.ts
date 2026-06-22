export interface Shop {
  id: string;
  name: string;
  emoji: string;
  categories: string[];
}

export interface Product {
  id: string;
  shop_id: string;
  name: string;
  price: number;
  old_price?: number;
  is_sale: boolean;
  is_bulk: boolean;
  image_url?: string;
  images: string[];
  categories: string[];
  sizes: string[];
}

export const CLOTHING_CATEGORIES = ["Sports", "Vêtements hommes", "Vêtement femmes", "Underwear", "Maman et bébé"];
export const SHOE_CATEGORIES = ["Chaussures et sacs"];
export const CLOTHING_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
export const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

export interface Profile {
  id: string;
  name: string;
  phone?: string;
  wishlist: string[];
  wallet_points: number;
}

export interface Order {
  id: string;
  profile_id: string;
  shop_id: string;
  product_id: string;
  price: number;
  status: "pending" | "confirmed" | "delivered";
  created_at: string;
  product?: Product;
  shop?: Shop;
}

export interface Settings {
  whatsapp_number: string;
}

export const CATEGORIES = [
  "ALL",
  "Sports",
  "Maman et bébé",
  "Vêtements hommes",
  "Chaussures et sacs",
  "Marchandise général",
  "Global",
  "Phone",
  "Home textiles",
  "Furnitures",
  "Accessoires",
  "Vêtement femmes",
  "Underwear",
  "Entertainment",
  "Home appliances",
  "Accessoires voitures",
  "Fruits",
  "Ordinateurs",
  "Beauté",
  "Home improvement",
] as const;
