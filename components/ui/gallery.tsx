"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", alt: "Terrasse luxe", tall: true },
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", alt: "Canapé modulaire", tall: false },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", alt: "Détail assemblage", tall: false },
  { src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800", alt: "Chaise longue", tall: true },
  { src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800", alt: "Espace extérieur", tall: false },
];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ART DE VIVRE
          </span>
          <h2 className="font-display font-bold text-white uppercase" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
            Lifestyle
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Col 1 */}
          <div className="flex flex-col gap-3 md:gap-4">
            <GalleryItem image={images[0]} isInView={isInView} delay={0} tall />
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-3 md:gap-4">
            <GalleryItem image={images[1]} isInView={isInView} delay={0.1} />
            <GalleryItem image={images[2]} isInView={isInView} delay={0.2} />
          </div>
          {/* Col 3 */}
          <div className="hidden md:flex flex-col gap-4">
            <GalleryItem image={images[3]} isInView={isInView} delay={0.15} tall />
            <GalleryItem image={images[4]} isInView={isInView} delay={0.25} />
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  image,
  isInView,
  delay,
  tall,
}: {
  image: { src: string; alt: string };
  isInView: boolean;
  delay: number;
  tall?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
        sizes="(max-width: 768px) 50vw, 33vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-transparent transition-colors duration-500" />
    </motion.div>
  );
}
