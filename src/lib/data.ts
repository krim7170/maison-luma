import { supabase, isSupabaseReady } from "./supabase";
import { mockShops, mockProducts, mockSettings } from "./mock-data";
import { Shop, Product } from "@/types";

export async function getShops(): Promise<Shop[]> {
  if (!isSupabaseReady || !supabase) return mockShops;
  const { data, error } = await supabase.from("shops").select("*").order("created_at");
  if (error || !data) return mockShops;
  return data as Shop[];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseReady || !supabase) return mockProducts;
  const { data, error } = await supabase.from("products").select("*").order("created_at");
  if (error || !data) return mockProducts;
  return data as Product[];
}

export async function createShop(shop: Omit<Shop, "id">): Promise<Shop | null> {
  if (!isSupabaseReady || !supabase) return null;
  const { data, error } = await supabase.from("shops").insert(shop).select().single();
  if (error) { console.error("createShop:", error.message); return null; }
  return data as Shop;
}

export async function deleteShop(id: string): Promise<boolean> {
  if (!isSupabaseReady || !supabase) return false;
  const { error } = await supabase.from("shops").delete().eq("id", id);
  if (error) { console.error("deleteShop:", error.message); return false; }
  return true;
}

export async function createProduct(
  product: Omit<Product, "id">,
  imageFile?: File
): Promise<Product | null> {
  if (!isSupabaseReady || !supabase) return null;

  let image_url = product.image_url;

  if (imageFile) {
    const ext = imageFile.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, imageFile, { upsert: false });

    if (uploadError) {
      console.error("Upload photo:", uploadError.message);
    } else {
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);
      image_url = urlData.publicUrl;
    }
  }

  const { data, error } = await supabase
    .from("products")
    .insert({ ...product, image_url })
    .select()
    .single();

  if (error) { console.error("createProduct:", error.message); return null; }
  return data as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!isSupabaseReady || !supabase) return false;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) { console.error("deleteProduct:", error.message); return false; }
  return true;
}

export async function getSettings(): Promise<{ whatsapp_number: string }> {
  if (!isSupabaseReady || !supabase) return mockSettings;
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error || !data) return mockSettings;
  return data;
}

export async function updateWhatsapp(number: string): Promise<boolean> {
  if (!isSupabaseReady || !supabase) return false;
  const { error } = await supabase
    .from("settings")
    .update({ whatsapp_number: number })
    .eq("id", 1);
  if (error) { console.error("updateWhatsapp:", error.message); return false; }
  return true;
}
