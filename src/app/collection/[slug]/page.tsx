"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomCursor } from "../../../../components/ui/cursor";
import { Navbar } from "../../../../components/ui/navbar";
import { Footer } from "../../../../components/ui/footer";
import { ProductCard } from "../../../../components/ui/product-card";
import { products, getProductBySlug } from "../../../../lib/data/products";
import { ChevronDown, ArrowRight } from "lucide-react";

const accordionItems = [
  { key: "dimensions", label: "Dimensions" },
  { key: "materials", label: "Matériaux" },
  { key: "maintenance", label: "Entretien" },
  { key: "delivery", label: "Livraison" },
] as const;

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.configs[0].color);
  const [activeSize, setActiveSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [openAccordion, setOpenAccordion] = useState<string | null>("dimensions");

  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true });

  const related = products.filter((p) => p.id !== product.id && p.featured).slice(0, 3);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen pt-20">
        {/* Product hero */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Gallery */}
            <div className="space-y-3">
              <motion.div
                layoutId={`product-image-${product.id}`}
                className="relative overflow-hidden bg-[#111]"
                style={{
                  aspectRatio: "4/5",
                  clipPath:
                    "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className="relative flex-none w-16 h-16 overflow-hidden border transition-colors"
                      style={{
                        borderColor: activeImage === i ? "#ff3c00" : "#2a2a2a",
                      }}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, y: 30 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-28"
            >
              <span
                className="text-[9px] tracking-[0.35em] text-[#c4a882] uppercase block mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {product.subtitle}
              </span>
              <h1
                className="font-display font-bold text-white uppercase mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.0 }}
              >
                {product.name}
              </h1>
              <p className="text-[#888] leading-relaxed mb-8">{product.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  € {product.price.toLocaleString("fr-FR")}
                </span>
                <span className="text-[#555] text-xs ml-3">TVA incluse</span>
              </div>

              {/* Color selector */}
              <div className="mb-6">
                <p
                  className="text-[9px] tracking-[0.3em] text-[#555] uppercase mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Tissu —{" "}
                  <span className="text-[#c4a882]">
                    {product.configs.find((c) => c.color === activeColor)?.label}
                  </span>
                </p>
                <div className="flex gap-2">
                  {product.configs.map((cfg) => (
                    <button
                      key={cfg.color}
                      onClick={() => setActiveColor(cfg.color)}
                      title={cfg.label}
                      className="w-8 h-8 rounded-full border-2 transition-all duration-200"
                      style={{
                        background: cfg.hex,
                        borderColor: activeColor === cfg.color ? "#fff" : "transparent",
                        boxShadow:
                          activeColor === cfg.color
                            ? "0 0 0 1px #555"
                            : "0 0 0 1px rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-8">
                <p
                  className="text-[9px] tracking-[0.3em] text-[#555] uppercase mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Configuration
                </p>
                <div className="flex gap-2">
                  {(["S", "M", "L", "XL"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSize(s)}
                      className="w-12 h-10 text-xs border transition-all duration-200"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        borderColor: activeSize === s ? "#ff3c00" : "#2a2a2a",
                        color: activeSize === s ? "#fff" : "#555",
                        background: activeSize === s ? "rgba(255,60,0,0.1)" : "transparent",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-3 py-4 mb-4 text-xs tracking-[0.25em] uppercase text-white border border-[#ff3c00] bg-[#ff3c00]/10 hover:bg-[#ff3c00] transition-all duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Demander un devis
                <ArrowRight size={14} />
              </button>
              <button
                className="w-full py-4 text-xs tracking-[0.25em] uppercase text-[#555] border border-[#2a2a2a] hover:border-[#555] hover:text-[#888] transition-all duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Ajouter à ma sélection
              </button>

              {/* Accordion */}
              <div className="mt-10 border-t border-[#1a1a1a]">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-[#1a1a1a]">
                    <button
                      onClick={() =>
                        setOpenAccordion(openAccordion === item.key ? null : item.key)
                      }
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span
                        className="text-[10px] tracking-[0.25em] text-[#888] uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item.label}
                      </span>
                      <motion.div
                        animate={{ rotate: openAccordion === item.key ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={14} className="text-[#555]" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openAccordion === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#666] text-sm leading-relaxed pb-4">
                            {product.details[item.key]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t border-[#1a1a1a] py-20 md:py-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div className="mb-10">
                <span
                  className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  DÉCOUVREZ AUSSI
                </span>
                <h2
                  className="font-display font-bold text-white uppercase"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Vous aimerez aussi
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    name={p.name}
                    subtitle={p.subtitle}
                    price={p.price}
                    image={p.image}
                    slug={p.slug}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
