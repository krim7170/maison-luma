"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Layers, Wrench, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Teck FSC Certifié",
    desc: "Bois issu de forêts gérées durablement. Chaque pièce porte l'empreinte d'une matière vivante, patiné par le temps.",
  },
  {
    icon: Layers,
    title: "Tissu Sunbrella®",
    desc: "Référence mondiale du tissu outdoor. Résistance aux UV, à l'humidité et aux taches. Traitement anti-moisissures.",
  },
  {
    icon: Wrench,
    title: "Assemblage Artisanal",
    desc: "Chaque assemblage est réalisé à la main dans notre atelier. Zéro vis apparente, joints invisibles, finitions irréprochables.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie 10 Ans",
    desc: "Nous garantissons chaque pièce Maison Luma contre tout défaut de fabrication pendant 10 ans. Sans conditions.",
  },
];

export function SavoirFaire() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="materiaux" ref={ref} className="bg-[#f5f2ed] py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            NOTRE ENGAGEMENT
          </span>
          <h2 className="font-display font-bold text-[#0a0a0a] uppercase" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
            Savoir-Faire
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.12 + 0.2,
                }}
                className="bg-white p-8 border-t-2 border-[#c4a882] group hover:border-[#ff3c00] transition-colors duration-300"
              >
                <div className="w-10 h-10 mb-6 flex items-center justify-center text-[#c4a882] group-hover:text-[#ff3c00] transition-colors">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-[#0a0a0a] text-sm uppercase tracking-wider mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
