"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function ConfiguratorTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-32 md:py-48 overflow-hidden border-t border-[#1a1a1a]">
      {/* Animated SVG circles background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${i * 200}px`,
              height: `${i * 200}px`,
              border: "1px solid rgba(255,255,255,0.04)",
              background: i === 1 ? "radial-gradient(circle, rgba(196,168,130,0.05) 0%, transparent 70%)" : "transparent",
            }}
            animate={{
              scale: [1, 1 + i * 0.03, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            SUR MESURE
          </span>
          <h2
            className="font-display font-bold text-white uppercase mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 6rem)", lineHeight: 0.95 }}
          >
            CONFIGUREZ
            <br />
            VOTRE ESPACE
          </h2>
          <p className="text-[#666] text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed">
            Notre outil 3D vous permet de composer votre configuration sur-mesure et de visualiser votre espace avant livraison.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.3em] uppercase text-white border border-[#555] hover:bg-white hover:text-black transition-all duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Demander une configuration
            <span className="w-6 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
