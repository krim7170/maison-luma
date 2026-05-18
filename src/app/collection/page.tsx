"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CustomCursor } from "../../../components/ui/cursor";
import { Navbar } from "../../../components/ui/navbar";
import { Footer } from "../../../components/ui/footer";
import { ProductCard } from "../../../components/ui/product-card";
import { products } from "../../../lib/data/products";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  { label: "Tous", value: "all" },
  { label: "Canapés", value: "canapes" },
  { label: "Chaises longues", value: "chaises" },
  { label: "Tables", value: "tables" },
] as const;

type Cat = typeof categories[number]["value"];

const sortOptions = [
  { label: "Prix croissant", value: "asc" },
  { label: "Prix décroissant", value: "desc" },
  { label: "Recommandés", value: "featured" },
] as const;

type Sort = typeof sortOptions[number]["value"];

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<Cat>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen pt-20">
        {/* Hero minimaliste */}
        <div ref={heroRef} className="border-b border-[#1a1a1a] py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              SAISON 2024
            </span>
            <h1
              className="font-display font-bold text-white uppercase"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
            >
              Collections
            </h1>
            <p className="text-[#555] mt-6 max-w-md text-sm leading-relaxed">
              Chaque pièce est une invitation à réinventer votre espace extérieur.
              Teck massif. Sunbrella®. Assemblage artisanal.
            </p>
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 flex gap-10">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <p
                  className="text-[9px] tracking-[0.3em] text-[#444] uppercase mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Catégorie
                </p>
                <ul className="space-y-2">
                  {categories.map((c) => (
                    <li key={c.value}>
                      <button
                        onClick={() => setActiveCategory(c.value)}
                        className="text-sm transition-colors w-full text-left"
                        style={{
                          color: activeCategory === c.value ? "#e0e0e0" : "#555",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {activeCategory === c.value && (
                          <span className="text-[#ff3c00] mr-2">▸</span>
                        )}
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="text-[9px] tracking-[0.3em] text-[#444] uppercase mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Trier par
                </p>
                <ul className="space-y-2">
                  {sortOptions.map((s) => (
                    <li key={s.value}>
                      <button
                        onClick={() => setSort(s.value)}
                        className="text-sm transition-colors w-full text-left"
                        style={{
                          color: sort === s.value ? "#e0e0e0" : "#555",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {sort === s.value && <span className="text-[#ff3c00] mr-2">▸</span>}
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#1a1a1a] pt-6">
                <p
                  className="text-[9px] tracking-[0.3em] text-[#444] uppercase mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {filtered.length} pièce{filtered.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </aside>

          {/* Mobile filter bar */}
          <div className="lg:hidden w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setActiveCategory(c.value)}
                    className="flex-none text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      borderColor: activeCategory === c.value ? "#ff3c00" : "#2a2a2a",
                      color: activeCategory === c.value ? "#fff" : "#555",
                      background: activeCategory === c.value ? "rgba(255,60,0,0.1)" : "transparent",
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="ml-3 flex-none p-2 border border-[#2a2a2a] text-[#555]"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Products grid (mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  subtitle={product.subtitle}
                  price={product.price}
                  image={product.image}
                  slug={product.slug}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Products grid — desktop */}
          <div className="hidden lg:grid flex-1 grid-cols-3 gap-6 md:gap-8 content-start">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                name={product.name}
                subtitle={product.subtitle}
                price={product.price}
                image={product.image}
                slug={product.slug}
                index={i}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
