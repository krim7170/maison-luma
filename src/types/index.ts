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
  image_url?: string;
  categories: string[];
}

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
