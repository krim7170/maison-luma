"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const fadeUpProps = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-white to-amber-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-stone-200/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div {...fadeUpProps(0.1)}>
          <Badge variant="secondary" className="mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
            Nouvelle Collection 2024
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUpProps(0.25)}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          L&apos;élégance
          <br />
          <span className="text-amber-700">à l&apos;état pur</span>
        </motion.h1>

        <motion.p
          {...fadeUpProps(0.4)}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Des pièces d&apos;exception façonnées par des artisans passionnés. Chaque création raconte
          une histoire, chaque détail est une promesse de perfection.
        </motion.p>

        <motion.div
          {...fadeUpProps(0.55)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="px-8 gap-2">
            Explorer la collection
            <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Notre histoire
          </Button>
        </motion.div>

        <motion.div
          {...fadeUpProps(0.7)}
          className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          {[
            { value: "12+", label: "Années d'excellence" },
            { value: "340", label: "Pièces créées" },
            { value: "28", label: "Artisans partenaires" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
