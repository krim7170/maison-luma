"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  subtitle: string;
  price: number;
  image: string;
  slug: string;
  index?: number;
}

export function ProductCard({ name, subtitle, price, image, slug, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/collection/${slug}`} className="group block">
        <div
          className="relative overflow-hidden mb-4"
          style={{
            aspectRatio: "4/5",
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-[#0a0a0a]/70 flex flex-col justify-end p-6 transition-all"
          >
            <p className="text-[10px] tracking-[0.3em] text-[#c4a882] uppercase mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {subtitle}
            </p>
            <p className="font-display text-white text-xl font-bold uppercase mb-4">{name}</p>
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">
                € {price.toLocaleString("fr-FR")}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#888] border border-[#333] px-3 py-1.5 group-hover:border-[#ff3c00] group-hover:text-[#ff3c00] transition-colors">
                Voir la pièce <ArrowUpRight size={12} />
              </span>
            </div>
          </motion.div>
        </div>
        <div className="px-1">
          <h3 className="font-display text-white text-sm font-bold uppercase tracking-wide">{name}</h3>
          <p className="text-[#666] text-xs mt-1">{subtitle} · € {price.toLocaleString("fr-FR")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
