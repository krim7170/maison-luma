"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductCard } from "./product-card";
import { products } from "../../lib/data/products";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Canapés", value: "canapes" },
  { label: "Chaises", value: "chaises" },
  { label: "Tables", value: "tables" },
] as const;

type Filter = typeof filters[number]["value"];

export function CollectionsGrid() {
  const [active, setActive] = useState<Filter>("all");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);
  const featured = filtered.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="collections" ref={ref} className="bg-[#0a0a0a] py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              SAISON 2024
            </span>
            <h2 className="font-display font-bold text-white uppercase" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Collections
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActive(f.value)}
                whileTap={{ scale: 0.97 }}
                className="relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: active === f.value ? "#fff" : "#555",
                  border: `1px solid ${active === f.value ? "#ff3c00" : "#2a2a2a"}`,
                }}
              >
                {active === f.value && (
                  <motion.div
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-[#ff3c00]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, i) => (
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 text-center"
        >
          <a
            href="/collection"
            className="inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#888] hover:text-white border border-[#2a2a2a] hover:border-[#555] px-8 py-4 uppercase transition-all duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Voir toute la collection
            <span className="w-6 h-px bg-current" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
