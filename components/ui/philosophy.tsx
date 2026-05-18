"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const letters = "PHILOSOPHIE".split("");

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Split title */}
            <h2 className="font-display font-bold uppercase text-white mb-10 overflow-hidden">
              <span className="block text-[10px] tracking-[0.4em] text-[#c4a882] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                NOTRE
              </span>
              <span className="flex flex-wrap" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.04 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                    style={{ marginRight: letter === " " ? "0.3em" : "0" }}
                  >
                    {letter === " " ? " " : letter}
                  </motion.span>
                ))}
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-[#888] leading-relaxed text-base md:text-lg mb-8"
            >
              Chaque pièce Maison Luma naît d&apos;une obsession pour la matière.{" "}
              <span className="text-[#e0e0e0]">Teck massif.</span>{" "}
              <span className="text-[#e0e0e0]">Tissu outdoor Sunbrella.</span>{" "}
              <span className="text-[#e0e0e0]">Assemblages sans vis apparentes.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="w-12 h-px bg-[#ff3c00]" />
              <span className="text-[10px] tracking-[0.3em] text-[#555] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                FONDÉE EN 2012 · PARIS
              </span>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
            style={{
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
              alt="Notre philosophie"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
