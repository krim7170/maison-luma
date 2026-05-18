"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Une qualité incomparable. Après deux saisons sur notre terrasse provençale, le teck est plus beau que jamais. Un investissement pour la vie.",
    name: "Isabelle M.",
    city: "Aix-en-Provence",
    rating: 5,
  },
  {
    quote: "Le Set Îlot a transformé notre espace outdoor en véritable salon extérieur. Chaque détail est pensé. Le service sur-mesure est exceptionnel.",
    name: "Thomas & Élise R.",
    city: "Saint-Tropez",
    rating: 5,
  },
  {
    quote: "La Méridienne Bora est devenue la pièce maîtresse de notre jardin. Confort absolu, résistance parfaite. Je recommande sans hésitation.",
    name: "Laurent V.",
    city: "Bordeaux",
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#f5f2ed] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ILS NOUS FONT CONFIANCE
          </span>
          <h2 className="font-display font-bold text-[#0a0a0a] uppercase" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
            Témoignages
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-none w-[85vw] md:w-[40vw] lg:w-[30vw] snap-center bg-white p-8 md:p-10"
              style={{
                clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} fill="#c4a882" stroke="none" />
                ))}
              </div>

              <blockquote className="text-[#0a0a0a] text-base md:text-lg italic leading-relaxed mb-8 font-light">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 border-t border-[#eee] pt-6">
                <div className="w-8 h-8 rounded-full bg-[#f5f2ed] flex items-center justify-center text-xs font-bold text-[#c4a882] font-display">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0a0a0a]">{t.name}</p>
                  <p className="text-xs text-[#888]">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
