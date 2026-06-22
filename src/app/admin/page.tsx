"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Package, Settings, Loader2, Pencil, X } from "lucide-react";
import { getShops, getProducts, createShop, deleteShop, createProduct, deleteProduct, updateProduct, getSettings, updateWhatsapp } from "@/lib/data";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { Shop, Product, CATEGORIES, CLOTHING_CATEGORIES, SHOE_CATEGORIES, CLOTHING_SIZES, SHOE_SIZES } from "@/types";

type Tab = "boutiques" | "produits" | "settings";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("boutiques");
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [whatsapp, setWhatsapp] = useState("212600000000");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [newShopName, setNewShopName] = useState("");
  const [newShopEmoji, setNewShopEmoji] = useState("🛍️");
  const [newShopCategory, setNewShopCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    shop_id: "", name: "", price: "", old_price: "", is_sale: false, is_bulk: false,
    sizes: [] as string[], imageFile: null as File | null, imagePreview: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "", price: "", old_price: "", is_sale: false, is_bulk: false, sizes: [] as string[],
    image_url: "", imageFile: null as File | null, imagePreview: "",
  });

  useEffect(() => {
    Promise.all([getShops(), getProducts(), getSettings()]).then(([s, p, settings]) => {
      setShops(s);
      setProducts(p);
      setWhatsapp(settings.whatsapp_number);
      if (s.length > 0) setNewProduct((prev) => ({ ...prev, shop_id: s[0].id }));
      setLoading(false);
    });
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  };

  const getAvailableSizes = () => {
    const shop = shops.find((s) => s.id === newProduct.shop_id);
    if (!shop) return [];
    const cats = shop.categories;
    if (cats.some((c) => CLOTHING_CATEGORIES.includes(c))) return CLOTHING_SIZES;
    if (cats.some((c) => SHOE_CATEGORIES.includes(c))) return SHOE_SIZES;
    return [];
  };

  const toggleSize = (size: string) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleAddShop = async () => {
    if (!newShopName.trim()) return;
    setSaving(true);
    const categories = newShopCategory ? [newShopCategory] : [];
    const shop = await createShop({ name: newShopName.trim(), emoji: newShopEmoji, categories });
    if (shop) {
      setShops((prev) => [...prev, shop]);
      showFeedback("✓ Boutique ajoutée !");
    } else {
      const local: Shop = { id: `shop-${Date.now()}`, name: newShopName.trim(), emoji: newShopEmoji, categories };
      setShops((prev) => [...prev, local]);
      showFeedback(isSupabaseReady ? "⚠️ Erreur Supabase" : "✓ Ajouté (mode local)");
    }
    setNewShopName("");
    setNewShopEmoji("🛍️");
    setNewShopCategory("");
    setSaving(false);
  };

  const handleDeleteShop = async (id: string) => {
    await deleteShop(id);
    setShops((prev) => prev.filter((s) => s.id !== id));
    setProducts((prev) => prev.filter((p) => p.shop_id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProduct((prev) => ({ ...prev, imageFile: file, imagePreview: URL.createObjectURL(file) }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.shop_id) return;
    setSaving(true);
    const productData = {
      shop_id: newProduct.shop_id,
      name: newProduct.name.trim(),
      price: parseInt(newProduct.price),
      old_price: newProduct.old_price ? parseInt(newProduct.old_price) : undefined,
      is_sale: newProduct.is_sale,
      is_bulk: newProduct.is_bulk,
      sizes: newProduct.sizes,
      image_url: newProduct.imagePreview || undefined,
      images: [],
      categories: [] as string[],
    };
    const product = await createProduct(productData, newProduct.imageFile || undefined);
    if (product) {
      setProducts((prev) => [...prev, product]);
      showFeedback("✓ Produit ajouté !");
    } else {
      const local: Product = { id: `p-${Date.now()}`, ...productData };
      setProducts((prev) => [...prev, local]);
      showFeedback(isSupabaseReady ? "⚠️ Erreur Supabase" : "✓ Ajouté (mode local)");
    }
    setNewProduct({ shop_id: shops[0]?.id || "", name: "", price: "", old_price: "", is_sale: false, is_bulk: false, sizes: [], imageFile: null, imagePreview: "" });
    setSaving(false);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: String(product.price),
      old_price: product.old_price ? String(product.old_price) : "",
      is_sale: product.is_sale,
      is_bulk: product.is_bulk,
      sizes: product.sizes || [],
      image_url: product.image_url || "",
      imageFile: null,
      imagePreview: product.image_url || "",
    });
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditForm((prev) => ({ ...prev, imageFile: file, imagePreview: URL.createObjectURL(file) }));
  };

  const toggleEditSize = (size: string) => {
    setEditForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editForm.name.trim() || !editForm.price) return;
    setSaving(true);
    let image_url = editForm.image_url;
    if (editForm.imageFile && supabase) {
      const ext = editForm.imageFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(path, editForm.imageFile, { upsert: false });
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
        image_url = urlData.publicUrl;
      }
    }
    const updates = {
      name: editForm.name.trim(),
      price: parseInt(editForm.price),
      old_price: editForm.old_price ? parseInt(editForm.old_price) : undefined,
      is_sale: editForm.is_sale,
      is_bulk: editForm.is_bulk,
      sizes: editForm.sizes,
      image_url,
    };
    const ok = await updateProduct(editingId, updates);
    if (ok) {
      setProducts((prev) => prev.map((p) => p.id === editingId ? { ...p, ...updates } : p));
      showFeedback("✓ Produit modifié !");
    } else {
      setProducts((prev) => prev.map((p) => p.id === editingId ? { ...p, ...updates } : p));
      showFeedback(isSupabaseReady ? "⚠️ Erreur Supabase" : "✓ Modifié (mode local)");
    }
    setEditingId(null);
    setSaving(false);
  };

  const handleSaveWhatsapp = async () => {
    setSaving(true);
    const ok = await updateWhatsapp(whatsapp);
    showFeedback(ok ? "✓ Numéro mis à jour !" : "✓ Enregistré (mode local)");
    setSaving(false);
  };

  const availableSizes = getAvailableSizes();
  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-yellow-400 bg-white";

  if (loading) {
    return (
      <div className="min-h-screen bg-sable flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sable pb-10">
      <header className="bg-ink px-4 pt-10 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-white/60 hover:text-white"><ArrowLeft size={20} /></Link>
            <div>
              <h1 className="text-xl font-bold text-saffron">Admin</h1>
              <p className="text-white/50 text-xs">{isSupabaseReady ? "🟢 Supabase connecté" : "🟡 Mode local"}</p>
            </div>
          </div>
          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            {(["boutiques", "produits", "settings"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors capitalize ${tab === t ? "bg-saffron text-ink" : "text-white/60"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {feedback && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-ink text-saffron font-bold text-sm px-5 py-3 rounded-xl shadow-lg">
          {feedback}
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-5">

        {/* BOUTIQUES */}
        {tab === "boutiques" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-bold text-ink mb-3 flex items-center gap-2">
                <Plus size={16} className="text-teal" /> Nouvelle boutique
              </h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input type="text" placeholder="Emoji" value={newShopEmoji}
                    onChange={(e) => setNewShopEmoji(e.target.value)}
                    className="w-20 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-center outline-none focus:border-yellow-400" />
                  <input type="text" placeholder="Nom de la boutique" value={newShopName}
                    onChange={(e) => setNewShopName(e.target.value)} className={`${inputClass} flex-1`} />
                </div>
                <select value={newShopCategory} onChange={(e) => setNewShopCategory(e.target.value)} className={inputClass}>
                  <option value="">Catégorie principale</option>
                  {CATEGORIES.filter((c) => c !== "ALL").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button onClick={handleAddShop} disabled={!newShopName.trim() || saving}
                  className="w-full bg-ink text-saffron font-bold py-3 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Ajouter
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {shops.map((shop) => (
                <div key={shop.id} className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{shop.emoji}</span>
                    <div>
                      <p className="font-semibold text-ink">{shop.name}</p>
                      <p className="text-xs text-gray-400">
                        {shop.categories[0] || "Sans catégorie"} · {products.filter((p) => p.shop_id === shop.id).length} produit(s)
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteShop(shop.id)} className="text-gray-300 hover:text-coral p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {shops.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-6">Aucune boutique</p>
              )}
            </div>
          </div>
        )}

        {/* PRODUITS */}
        {tab === "produits" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-bold text-ink mb-3 flex items-center gap-2">
                <Plus size={16} className="text-teal" /> Nouveau produit
              </h2>
              <div className="space-y-3">
                {shops.length === 0 ? (
                  <p className="text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
                    Créez d&apos;abord une boutique.
                  </p>
                ) : (
                  <>
                    <select value={newProduct.shop_id}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, shop_id: e.target.value, sizes: [] }))}
                      className={inputClass}>
                      {shops.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                    </select>
                    <input type="text" placeholder="Nom du produit" value={newProduct.name}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))} className={inputClass} />
                    <div className="flex gap-2">
                      <input type="number" placeholder="Prix (F CFA)" value={newProduct.price}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))} className={`${inputClass} flex-1`} />
                      <input type="number" placeholder="Ancien prix" value={newProduct.old_price}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, old_price: e.target.value }))} className={`${inputClass} flex-1`} />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={newProduct.is_sale}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, is_sale: e.target.checked }))}
                          className="w-4 h-4 accent-red-500" />
                        <span className="text-sm text-ink">En promo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={newProduct.is_bulk}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, is_bulk: e.target.checked }))}
                          className="w-4 h-4 accent-teal-500" />
                        <span className="text-sm text-ink">Vente en gros</span>
                      </label>
                    </div>

                    {availableSizes.length > 0 && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 mb-2 block">
                          Tailles disponibles
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availableSizes.map((size) => (
                            <button key={size} type="button" onClick={() => toggleSize(size)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                newProduct.sizes.includes(size)
                                  ? "bg-ink text-white border-ink"
                                  : "bg-gray-50 text-ink border-gray-200 hover:border-ink"
                              }`}>
                              {size}
                            </button>
                          ))}
                        </div>
                        {newProduct.sizes.length > 0 && (
                          <p className="text-xs text-teal mt-1">Sélectionné : {newProduct.sizes.join(", ")}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Photo du produit</label>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-yellow-400 bg-gray-50">
                        {newProduct.imagePreview ? (
                          <img src={newProduct.imagePreview} alt="Preview" className="h-32 object-contain rounded-lg" />
                        ) : (
                          <>
                            <Package size={32} className="text-gray-300 mb-2" />
                            <span className="text-xs text-gray-400 text-center">
                              Appuyer pour choisir une photo<br />
                              <span className="text-teal">depuis la galerie ou appareil photo</span>
                            </span>
                          </>
                        )}
                        <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
                      </label>
                    </div>

                    <button onClick={handleAddProduct}
                      disabled={!newProduct.name.trim() || !newProduct.price || !newProduct.shop_id || saving}
                      className="w-full bg-ink text-saffron font-bold py-3 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Ajouter le produit
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {products.map((product) => {
                const shop = shops.find((s) => s.id === product.shop_id);
                const editSizes = (() => {
                  if (!shop) return [];
                  if (shop.categories.some((c) => CLOTHING_CATEGORIES.includes(c))) return CLOTHING_SIZES;
                  if (shop.categories.some((c) => SHOE_CATEGORIES.includes(c))) return SHOE_SIZES;
                  return [];
                })();
                if (editingId === product.id) {
                  return (
                    <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-ink text-sm">Modifier le produit</p>
                        <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-coral"><X size={16} /></button>
                      </div>
                      <input type="text" value={editForm.name} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Nom du produit" className={inputClass} />
                      <div className="flex gap-2">
                        <input type="number" value={editForm.price} onChange={(e) => setEditForm((p) => ({ ...p, price: e.target.value }))}
                          placeholder="Prix (€)" className={`${inputClass} flex-1`} />
                        <input type="number" value={editForm.old_price} onChange={(e) => setEditForm((p) => ({ ...p, old_price: e.target.value }))}
                          placeholder="Ancien prix (€)" className={`${inputClass} flex-1`} />
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={editForm.is_sale} onChange={(e) => setEditForm((p) => ({ ...p, is_sale: e.target.checked }))} className="accent-coral" />
                          En promo
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={editForm.is_bulk} onChange={(e) => setEditForm((p) => ({ ...p, is_bulk: e.target.checked }))} className="accent-teal" />
                          Vente en gros
                        </label>
                      </div>
                      {editSizes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {editSizes.map((size) => (
                            <button key={size} onClick={() => toggleEditSize(size)}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${editForm.sizes.includes(size) ? "bg-ink text-saffron border-ink" : "bg-white text-ink border-gray-200"}`}>
                              {size}
                            </button>
                          ))}
                        </div>
                      )}
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-3 cursor-pointer hover:border-yellow-400 bg-gray-50">
                        {editForm.imagePreview ? (
                          <div className="relative">
                            <img src={editForm.imagePreview} alt="Preview" className="h-28 object-contain rounded-lg" />
                            <span className="block text-center text-xs text-teal mt-1">Appuyer pour changer</span>
                          </div>
                        ) : (
                          <>
                            <Package size={28} className="text-gray-300 mb-1" />
                            <span className="text-xs text-gray-400 text-center">Ajouter une photo</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                      </label>

                      <div className="flex gap-2">
                        <button onClick={handleSaveEdit} disabled={saving}
                          className="flex-1 bg-ink text-saffron font-bold py-2.5 rounded-xl text-sm disabled:opacity-40">
                          {saving ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null} Enregistrer
                        </button>
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-100 text-gray-600 font-bold py-2.5 rounded-xl text-sm">
                          Annuler
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={product.id} className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.image_url
                        ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        : <span className="text-xl">{shop?.emoji || "🛍️"}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">
                        {shop?.name} · {product.price} €
                        {product.is_sale && <span className="ml-1 text-coral font-bold">PROMO</span>}
                        {product.is_bulk && <span className="ml-1 text-teal font-bold">GROS</span>}
                      </p>
                      {product.sizes && product.sizes.length > 0 && (
                        <p className="text-xs text-gray-400">{product.sizes.join(" · ")}</p>
                      )}
                    </div>
                    <button onClick={() => startEditing(product)} className="text-gray-300 hover:text-saffron p-1">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-300 hover:text-coral p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
              {products.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-6">Aucun produit</p>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-bold text-ink mb-3 flex items-center gap-2">
                <Settings size={16} className="text-teal" /> Paramètres
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Numéro WhatsApp (sans +)</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="212600000000" className={inputClass} />
                  <p className="text-xs text-gray-400 mt-1">Ex : 212612345678 (Maroc) · 221XXXXXXXX (Sénégal)</p>
                </div>
                <button onClick={handleSaveWhatsapp} disabled={saving}
                  className="w-full bg-ink text-saffron font-bold py-3 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null} Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
