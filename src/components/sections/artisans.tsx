"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const artisans = [
  {
    name: "Marie Fontaine",
    craft: "Céramiste",
    location: "Limoges",
    years: "22 ans de métier",
    initials: "MF",
    bg: "bg-amber-100",
  },
  {
    name: "Pierre Leblanc",
    craft: "Ébéniste",
    location: "Bordeaux",
    years: "18 ans de métier",
    initials: "PL",
    bg: "bg-stone-200",
  },
  {
    name: "Isabelle Roy",
    craft: "Tisserande",
    location: "Lyon",
    years: "15 ans de métier",
    initials: "IR",
    bg: "bg-rose-100",
  },
];

export function Artisans() {
  return (
    <section id="artisans" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Nos partenaires
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Les artisans</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {artisans.map((artisan, index) => (
            <motion.div
              key={artisan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div
                    className={`w-16 h-16 ${artisan.bg} rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4`}
                  >
                    {artisan.initials}
                  </div>
                  <h3 className="font-semibold text-lg">{artisan.name}</h3>
                  <p className="text-amber-700 text-sm font-medium mt-1">{artisan.craft}</p>
                  <p className="text-muted-foreground text-xs mt-2">{artisan.location}</p>
                  <p className="text-muted-foreground text-xs">{artisan.years}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
