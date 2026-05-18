"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Vase Aurore",
    category: "Céramique",
    price: "€ 280",
    description: "Céramique émaillée à la main, formes organiques inspirées des paysages de Provence.",
    tag: "Exclusif",
    color: "bg-amber-50",
  },
  {
    id: 2,
    name: "Lampe Solstice",
    category: "Luminaire",
    price: "€ 620",
    description: "Structure en laiton brossé, abat-jour en lin naturel tissé par nos artisans.",
    tag: "Nouveau",
    color: "bg-stone-50",
  },
  {
    id: 3,
    name: "Table Brume",
    category: "Mobilier",
    price: "€ 1 450",
    description: "Bois de chêne massif fumé, pieds en métal forgé. Une pièce intemporelle.",
    tag: "Best-seller",
    color: "bg-rose-50",
  },
  {
    id: 4,
    name: "Coussin Velours",
    category: "Textile",
    price: "€ 95",
    description: "Velours de soie, broderies réalisées à l'aiguille selon les techniques ancestrales.",
    tag: "Artisanal",
    color: "bg-sky-50",
  },
];

export function Collection() {
  return (
    <section id="collection" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Savoir-faire
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Notre Collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: index * 0.12 }}
            >
              <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div
                  className={`${product.color} h-48 flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-105`}
                >
                  ✦
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {product.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <span className="font-semibold text-sm">{product.price}</span>
                  <Button variant="ghost" size="sm">
                    Voir →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
