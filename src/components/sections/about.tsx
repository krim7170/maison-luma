"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={ref} className="py-24 bg-stone-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-4">Notre histoire</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Fondée sur la passion, <br />
              <span className="text-amber-400">bâtie sur l&apos;excellence</span>
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              Depuis 2012, Maison Luma réunit des artisans d&apos;exception et des designers visionnaires
              pour créer des objets qui transcendent le temps. Chaque pièce est le fruit d&apos;un dialogue
              entre tradition et modernité.
            </p>
            <p className="text-stone-400 leading-relaxed">
              Notre atelier parisien est un lieu de création et de transmission, où les techniques
              ancestrales rencontrent les sensibilités contemporaines. Un hommage permanent à
              l&apos;art de vivre à la française.
            </p>
          </motion.div>

          <motion.div
            style={{ y }}
            className="relative h-80 md:h-96"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-700/30 to-stone-700/30 rounded-2xl flex items-center justify-center text-8xl"
            >
              ◈
            </motion.div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-stone-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
